//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AzurePricingEstimatedAPIAPP
{
    using System;
    using System.Collections.Generic;
    
    public partial class RateCardData
    {
        public int ID { get; set; }
        public string MeterID { get; set; }
        public string MeterName { get; set; }
        public string MeterCategory { get; set; }
        public string MeterSubCategory { get; set; }
        public string Unit { get; set; }
        public string MeterTags { get; set; }
        public string MeterRegion { get; set; }
        public string MeterRates { get; set; }
        public System.DateTime EffectiveDate { get; set; }
        public int IncludedQuantity { get; set; }
        public string MeterStatus { get; set; }
    }
}