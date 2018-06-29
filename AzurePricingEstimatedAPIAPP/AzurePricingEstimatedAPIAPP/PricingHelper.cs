﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AzurePricingEstimatedAPIAPP
{
    public class PricingHelper
    {

        public void SaveProjectPricingDetais(ProjectDetail details)
        {
            using (AzurePricingEntities entities=new AzurePricingEntities())
            {
                entities.ProjectDetails.Add(details);
                entities.SaveChanges();
            }
        }

        internal void SaveRateCardDetails(List<RateCardData> detail)
        {
           
        }

        public string GetPriceDetails(string Category,string SubCategory,string Region)
        {
            string price = "";
            using (AzurePricingEntities entities = new AzurePricingEntities())
            {
               List<RateCardData> data= entities.RateCardDatas.Where(r => r.MeterSubCategory == SubCategory && r.MeterCategory==Category && r.MeterRegion==Region).ToList();
                if(data!=null && data.Count>0)
                {
                    price = data[0].MeterRates.Replace('[', ' ').Replace(']', ' ').Trim().Split(':')[1];
                }
                else
                {
                    price = "0.0";
                }
            }
            return price;
        }
    }
}