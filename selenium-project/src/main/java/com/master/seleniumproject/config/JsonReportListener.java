// It was created to generate of CTRF json report for GitHub Actions test summary
package com.master.seleniumproject.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonReportListener implements ITestListener {

    // Store test details
    private List<Map<String, Object>> tests = new ArrayList<>();
    private long startTime;
    private long endTime;

    @Override
    public void onStart(ITestContext context) {
        startTime = System.currentTimeMillis();  // Record the test suite start time
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        tests.add(createTestResult(result, "passed"));
    }

    @Override
    public void onTestFailure(ITestResult result) {
        tests.add(createTestResult(result, "failed"));
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        tests.add(createTestResult(result, "skipped"));
    }

    @Override
    public void onFinish(ITestContext context) {
        endTime = System.currentTimeMillis();  // Record the test suite end time

        // Create the summary map
        Map<String, Object> summary = new HashMap<>();
        summary.put("tests", tests.size());
        summary.put("passed", tests.stream().filter(t -> t.get("status").equals("passed")).count());
        summary.put("failed", tests.stream().filter(t -> t.get("status").equals("failed")).count());
        summary.put("pending", 0);  // Modify as needed
        summary.put("skipped", tests.stream().filter(t -> t.get("status").equals("skipped")).count());
        summary.put("other", 0);
        summary.put("start", startTime);
        summary.put("stop", endTime);
        summary.put("suites", context.getAllTestMethods().length);  // Total test methods

        // Create the results structure
        Map<String, Object> results = new HashMap<>();
        results.put("tool", Map.of("name", "Selenium"));
        results.put("summary", summary);
        results.put("tests", tests);

        // Serialize to JSON using Jackson
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("target/ctrf-report.json"), Map.of("results", results));
            System.out.println("Report generated successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Helper method to create the test result structure
    private Map<String, Object> createTestResult(ITestResult result, String status) {
        Map<String, Object> testDetails = new HashMap<>();
        testDetails.put("name", result.getMethod().getMethodName());
        testDetails.put("status", status);
        testDetails.put("duration", result.getEndMillis() - result.getStartMillis());
        testDetails.put("start", result.getStartMillis());
        testDetails.put("stop", result.getEndMillis());
        testDetails.put("rawStatus", status);
        testDetails.put("tags", new ArrayList<>());  // You can modify this to add custom tags
        testDetails.put("type", "e2e");  // Customize as per your need
        testDetails.put("filePath", result.getTestClass().getName());  // Path to test class
        testDetails.put("retries", 0);  // Customize as needed
        testDetails.put("flaky", false);  // Customize as needed

        // Capture steps (simulating steps, you can modify based on actual step capturing)
        List<Map<String, String>> steps = new ArrayList<>();
        steps.add(Map.of("name", "Step 1", "status", status));
        steps.add(Map.of("name", "Step 2", "status", status));
        testDetails.put("steps", steps);

        testDetails.put("suite", result.getTestClass().getName() + " > " + result.getMethod().getMethodName());
        testDetails.put("extra", Map.of("annotations", new ArrayList<>()));  // Customize as per need

        return testDetails;
    }
}
