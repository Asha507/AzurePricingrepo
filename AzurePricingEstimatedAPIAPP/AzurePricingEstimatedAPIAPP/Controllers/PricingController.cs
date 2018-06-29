using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AzurePricingEstimatedAPIAPP.Controllers
{
    [RoutePrefix("api/Pricing")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]  
    public class PricingController : ApiController
    {
        static readonly string TENANT = ConfigurationManager.AppSettings["Tenant"];
        static readonly string CLIENTID = ConfigurationManager.AppSettings["ClientId"];
        static readonly string CLIENTSECRET = ConfigurationManager.AppSettings["ClientSecret"];
        static readonly string SUBSCRIPTIONID = ConfigurationManager.AppSettings["SubscriptionId"];
        static readonly string REDIRECTURL = ConfigurationManager.AppSettings["RedirectUrl"];

        static readonly string RESOURCE = "https://management.azure.com/";

        // API Settings
        static readonly string APIVERSION = "2016-08-31-preview"; // "2015-06-01-preview";
        static readonly string OFFERDURABLEID = ConfigurationManager.AppSettings["OfferDurableId"];
        static readonly string CURRENCY = ConfigurationManager.AppSettings["Currency"];
        static readonly string LOCALE = ConfigurationManager.AppSettings["Locale"];
        static readonly string REGIONINFO = ConfigurationManager.AppSettings["RegionInfo"];

        [HttpGet]
        [Route("GetAzurePricingData")]
        public string GetAzurePricingData()
        {
            var token = GetOAuthTokenFromAAD();
            Console.WriteLine("Token received, read rate card data...");

            var data = GetRateCardData(token);
            if (data != null)
            {
                var ratecard = JsonConvert.DeserializeObject<RateCard>(data);
                List<Meter> meters = ratecard.Meters;
                using (AzurePricingEntities entities = new AzurePricingEntities())
                {
                    foreach (Meter item in meters)
                    {
                        RateCardData rateCardItem = new RateCardData();
                        rateCardItem.IncludedQuantity = (int)item.IncludedQuantity;
                        rateCardItem.EffectiveDate = item.EffectiveDate;
                        rateCardItem.MeterID = item.MeterId;
                        rateCardItem.MeterName = item.MeterName;
                        rateCardItem.MeterCategory = item.MeterCategory;
                        string meterRates = string.Join(",", item.MeterRates.Select(y => " [ " + y.Key.ToString() + " : " + y.Value.ToString() + " ]"));
                        rateCardItem.MeterRates = meterRates;
                        rateCardItem.MeterRegion = item.MeterRegion;
                        rateCardItem.MeterStatus = item.MeterStatus;
                        rateCardItem.MeterSubCategory = item.MeterSubCategory;
                        string meterTags = string.Join(",", item.MeterTags);
                        rateCardItem.MeterTags = meterTags;
                        rateCardItem.Unit = item.Unit;
                        entities.RateCardDatas.Add(rateCardItem);
                        entities.SaveChanges();
                    }
                }
            }
            return "success";
        }

        [HttpGet]
        [Route("GetPrice")]
        public string GetPrice(string Category, string SubCategory, string Region)
        {
            PricingHelper helper = new PricingHelper();
            string price=helper.GetPriceDetails(Category, SubCategory, Region);
            return (Convert.ToDouble(price) * 744).ToString();

        }

        [HttpPost]
        public string SavePricingData()
        {
            var httpRequest = HttpContext.Current.Request;
            dynamic projectDetails = JsonConvert.DeserializeObject<object>(httpRequest.Params["ProjectDetails"]);
            ProjectDetail detail = projectDetails.ToObject<ProjectDetail>();
            PricingHelper helper = new PricingHelper();
            helper.SaveProjectPricingDetais(detail);
            return "success";
        }
        public static string GetOAuthTokenFromAAD()
        {
            AuthenticationResult result;

            if (String.IsNullOrEmpty(CLIENTSECRET)) // if no client secret - authenticate with user...
                result = GetOAuthTokenForUser();
            else                                    // else authenticate with application
                result = GetOAuthTokenForApplication(CLIENTSECRET);

            if (result == null)
                throw new InvalidOperationException("Failed to obtain the JWT token");

            return result.AccessToken;
        }

        private static AuthenticationResult GetOAuthTokenForUser()
        {
            var authenticationContext = new AuthenticationContext($"https://login.microsoftonline.com/{TENANT}");
            var authTask = authenticationContext.AcquireTokenAsync(RESOURCE, CLIENTID,
                new Uri(REDIRECTURL), new PlatformParameters(PromptBehavior.Auto));
            authTask.Wait();
            return authTask.Result;
        }

        private static AuthenticationResult GetOAuthTokenForApplication(string clientSecret)
        {
            var authenticationContext = new AuthenticationContext($"https://login.microsoftonline.com/{TENANT}");
            ClientCredential clientCred = new ClientCredential(CLIENTID, clientSecret);
            var authTask = authenticationContext.AcquireTokenAsync(RESOURCE, clientCred);
            authTask.Wait();
            return authTask.Result;
        }

        public static string GetRateCardData(string token)
        {
            string url = $"https://management.azure.com/subscriptions/{SUBSCRIPTIONID}/providers/Microsoft.Commerce/RateCard?api-version={APIVERSION}&$filter=OfferDurableId eq '{OFFERDURABLEID}' and Currency eq '{CURRENCY}' and Locale eq '{LOCALE}' and RegionInfo eq '{REGIONINFO}'";

            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            HttpResponseMessage response = client.SendAsync(request).Result;

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine("An error occurred! That's what I got:");
                Console.WriteLine(response.ToString());
                return string.Empty; ;
            }

            var readTask = response.Content.ReadAsStringAsync();
            readTask.Wait();
            return readTask.Result;
        }
    }
}
