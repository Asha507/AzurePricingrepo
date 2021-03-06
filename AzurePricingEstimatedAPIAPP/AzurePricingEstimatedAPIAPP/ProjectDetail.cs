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
    
    public partial class ProjectDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProjectDetail()
        {
            this.ProjectResources = new HashSet<ProjectResource>();
        }
    
        public int ID { get; set; }
        public string Client_Account { get; set; }
        public string Project { get; set; }
        public string Product { get; set; }
        public string ProjectManager { get; set; }
        public string PM_EmailID { get; set; }
        public string SizingDoneBy { get; set; }
        public string SDB_EmailID { get; set; }
        public string QuotationDoneBy { get; set; }
        public string QDB_EmailID { get; set; }
        public Nullable<decimal> CostingEztimation { get; set; }
        public string Environment { get; set; }
        public int ConcurrentUserCount { get; set; }
        public string DeploymentRegion { get; set; }
        public string Duration { get; set; }
        public System.DateTime CreatedOn { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectResource> ProjectResources { get; set; }
    }
}
