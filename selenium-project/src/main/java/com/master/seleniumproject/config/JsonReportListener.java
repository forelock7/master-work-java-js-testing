// It was created to generate of CTRF json report for GitHub Actions test summary
package com.master.seleniumproject.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.testng.IConfigurationListener;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonReportListener implements ITestListener, IConfigurationListener {

    private List<Map<String, Object>> tests = new ArrayList<>();
    private long suiteStartTime;
    private long suiteEndTime;
    private long testStartTime;
    private long testEndTime;
    private long beforeAfterDuration = 0;

    @Override
    public void onStart(ITestContext context) {
        suiteStartTime = System.currentTimeMillis();  // Record the start time of the suite
    }

    @Override
    public void onTestStart(ITestResult result) {
        testStartTime = System.currentTimeMillis();  // Start time for each test
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        recordTestResult(result, "passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        recordTestResult(result, "failed");
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        recordTestResult(result, "skipped");
    }

    @Override
    public void onFinish(ITestContext context) {
        suiteEndTime = System.currentTimeMillis();  // Record the end time of the suite

        // Create summary data
        Map<String, Object> summary = new HashMap<>();
        summary.put("tests", tests.size());
        summary.put("passed", tests.stream().filter(t -> "passed".equals(t.get("status"))).count());
        summary.put("failed", tests.stream().filter(t -> "failed".equals(t.get("status"))).count());
        summary.put("skipped", tests.stream().filter(t -> "skipped".equals(t.get("status"))).count());
        summary.put("start", suiteStartTime);
        summary.put("stop", suiteEndTime);
        summary.put("totalTime", suiteEndTime - suiteStartTime + beforeAfterDuration);  // Include total time with setup/teardown

        // Build the full report structure
        Map<String, Object> results = new HashMap<>();
        results.put("tool", Map.of("name", "Selenium"));
        results.put("summary", summary);
        results.put("tests", tests);

        // Write to JSON with specified file name
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("target/ctrf-report.json"), Map.of("results", results));
            System.out.println("Report generated successfully as ctrf-report.json!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Tracking setup/teardown times for @BeforeMethod/@AfterMethod
    @Override
    public void beforeConfiguration(ITestResult result) {
        beforeAfterDuration -= System.currentTimeMillis();
    }

    @Override
    public void onConfigurationSuccess(ITestResult result) {
        beforeAfterDuration += System.currentTimeMillis();
    }

    @Override
    public void onConfigurationFailure(ITestResult result) {
        beforeAfterDuration += System.currentTimeMillis();
    }

    @Override
    public void onConfigurationSkip(ITestResult result) {
        beforeAfterDuration += System.currentTimeMillis();
    }

    private void recordTestResult(ITestResult result, String status) {
        testEndTime = System.currentTimeMillis();  // End time for each test
        Map<String, Object> testDetails = new HashMap<>();
        testDetails.put("name", result.getMethod().getMethodName());
        testDetails.put("status", status);
        testDetails.put("duration", testEndTime - testStartTime);
        testDetails.put("start", testStartTime);
        testDetails.put("stop", testEndTime);
        testDetails.put("rawStatus", status);
        testDetails.put("filePath", result.getTestClass().getName());
        testDetails.put("suite", result.getTestClass().getName() + " > " + result.getMethod().getMethodName());

        tests.add(testDetails);
    }
}
