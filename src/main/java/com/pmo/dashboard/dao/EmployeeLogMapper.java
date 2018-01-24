package com.pmo.dashboard.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.pmo.dashboard.entity.EmployeeGraphParam;
import com.pmo.dashboard.entity.EmployeeLog;

public interface EmployeeLogMapper {
	
	
	
    int add(EmployeeLog log);
    
    // Felix, 180118, Begin.
    List<EmployeeLog> queryEmpLogByDUNew(EmployeeGraphParam employeeGraphParam);
    
    List<EmployeeLog> queryEmpLogByDUOrg(@Param("startDate")String startDate, @Param("endDate")String endDate, @Param("du")String du);
    // Felix,180118, End.
}