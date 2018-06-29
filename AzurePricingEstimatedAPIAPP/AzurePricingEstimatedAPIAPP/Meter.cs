﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AzurePricingEstimatedAPIAPP
{
    public class Meter
    {
        public string MeterId { get; set; }
        public string MeterName { get; set; }
        public string MeterCategory { get; set; }
        public string MeterSubCategory { get; set; }
        public string Unit { get; set; }
        public List<string> MeterTags { get; set; }
        public string MeterRegion { get; set; }
        public Dictionary<double, double> MeterRates { get; set; }
        public DateTime EffectiveDate { get; set; }
        public double IncludedQuantity { get; set; }
        public string MeterStatus { get; set; }
    }
}