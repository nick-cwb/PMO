package com.pom.dashboard.service;

import java.util.List;

import com.pmo.dashboard.entity.EmployeeGraphParam;
import com.pmo.dashboard.entity.EmployeeLog;

/**
 * 员工日志
 * @author Devin
 *
 */
public interface EmployeeLogService {
	
	boolean add(EmployeeLog log);
	
	// Felix, 180118, Begin.
	List<EmployeeLog> queryEmpLogByDUNew(EmployeeGraphParam graphParam);
	
	List<EmployeeLog> queryEmpLogByDUOrg(String startDate, String endDate, String du);
	// Felix, 180118, End.

}
