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
    
    public partial class ProjectResource
    {
        public int ID { get; set; }
        public int Project_ID { get; set; }
        public string ResourceType { get; set; }
        public string ResourceSize { get; set; }
        public string SizeDescription { get; set; }
        public decimal Price { get; set; }
    
        public virtual ProjectDetail ProjectDetail { get; set; }
    }
}