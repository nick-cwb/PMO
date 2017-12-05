package com.pmo.dashboard.entity;

public class EmployeePageCondition extends PageCondition
{
    private String hsbcStaffId;
    private String eHr;
    private String csbuName;
    private String csDeptName;
    private String csSubDeptName;
    private String lob;
    private String resourceStatus;
    private String staffName;
    private String rmUserId;
    public String getRmUserId() {
		return rmUserId;
	}
	public void setRmUserId(String rmUserId) {
		this.rmUserId = rmUserId;
	}
	public String getHsbcStaffId()
    {
        return hsbcStaffId;
    }
    public void setHsbcStaffId(String hsbcStaffId)
    {
        this.hsbcStaffId = hsbcStaffId;
    }
    public String geteHr()
    {
        return eHr;
    }
    public void seteHr(String eHr)
    {
        this.eHr = eHr;
    }
    public String getCsbuName()
    {
        return csbuName;
    }
    public void setCsbuName(String csbuName)
    {
        this.csbuName = csbuName;
    }
    public String getCsDeptName()
    {
        return csDeptName;
    }
    public void setCsDeptName(String csDeptName)
    {
        this.csDeptName = csDeptName;
    }
    public String getCsSubDeptName()
    {
        return csSubDeptName;
    }
    public void setCsSubDeptName(String csSubDeptName)
    {
        this.csSubDeptName = csSubDeptName;
    }
    public String getLob()
    {
        return lob;
    }
    public void setLob(String lob)
    {
        this.lob = lob;
    }
    public String getResourceStatus()
    {
        return resourceStatus;
    }
    public void setResourceStatus(String resourceStatus)
    {
        this.resourceStatus = resourceStatus;
    }
    public String getStaffName()
    {
        return staffName;
    }
    public void setStaffName(String staffName)
    {
        this.staffName = staffName;
    }
    public EmployeePageCondition()
    {
        super();
        // TODO Auto-generated constructor stub
    }
    public EmployeePageCondition(String currentPage, String pageCount)
    {
        super(currentPage, pageCount);
        // TODO Auto-generated constructor stub
    }
    public EmployeePageCondition(String hsbcStaffId, String eHr,
            String csbuName, String csDeptName, String csSubDeptName,
            String lob)
    {
        super();
        this.hsbcStaffId = hsbcStaffId;
        this.eHr = eHr;
        this.csbuName = csbuName;
        this.csDeptName = csDeptName;
        this.csSubDeptName = csSubDeptName;
        this.lob = lob;
    }
    public EmployeePageCondition(String hsbcStaffId, String eHr,
            String csbuName, String csDeptName, String csSubDeptName,
            String lob, String resourceStatus, String staffName)
    {
        super();
        this.hsbcStaffId = hsbcStaffId;
        this.eHr = eHr;
        this.csbuName = csbuName;
        this.csDeptName = csDeptName;
        this.csSubDeptName = csSubDeptName;
        this.lob = lob;
        this.resourceStatus = resourceStatus;
        this.staffName = staffName;
    }
    
    
}
