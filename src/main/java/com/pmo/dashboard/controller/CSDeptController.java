package com.pmo.dashboard.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pmo.dashboard.entity.CSDept;
import com.pom.dashboard.service.CSDeptService;

@Controller
@RequestMapping(value="/csDept")
public class CSDeptController
{
    private static Logger logger = LoggerFactory
            .getLogger(CSDeptController.class);
    
  
    @Resource
    private CSDeptService csDeptService;
    
    @RequestMapping("/queryCSDeptName")
    @ResponseBody
    public List queryCSDeptName(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        List<CSDept> list = csDeptService.queryCSDeptName();
        return list;
    }
    
    @RequestMapping("/queryCSSubDeptName")
    @ResponseBody
    public List queryCSSubDeptName(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        String csSubDeptId = request.getParameter("csSubDeptId");
        List<CSDept> list = csDeptService.queryCSSubDeptName(csSubDeptId);
        return list;
    }
    
    @RequestMapping("/queryCSDeptById")
    @ResponseBody
    public Object queryCSDeptById(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        String csSubDeptId = request.getParameter("csSubDeptId");
        CSDept csDept = csDeptService.queryCSDeptById(csSubDeptId);
        return csDept;
    }
    
    @RequestMapping("/queryAllCSSubDeptName")
    @ResponseBody
    public Object queryAllCSSubDeptName(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        List<CSDept> list = csDeptService.queryAllCSSubDeptName();
        return list;
    }

}
