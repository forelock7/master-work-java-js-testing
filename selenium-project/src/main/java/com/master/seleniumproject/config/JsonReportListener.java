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
    private long beforeAfterDuration = 0;

    @Override
    public void onStart(ITestContext context) {
        suiteStartTime = System.currentTimeMillis();  // Start of the suite
    }

    @Override
    public void onTestStart(ITestResult result) {
        // Initialize individual test start time here if needed
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
        suiteEndTime = System.currentTimeMillis();  // End of the suite

        // Create summary data
        Map<String, Object> summary = new HashMap<>();
        summary.put("tests", tests.size());
        summary.put("passed", tests.stream().filter(t -> "passed".equals(t.get("status"))).count());
        summary.put("failed", tests.stream().filter(t -> "failed".equals(t.get("status"))).count());
        summary.put("pending", 0);  // Placeholder for pending tests
        summary.put("skipped", tests.stream().filter(t -> "skipped".equals(t.get("status"))).count());
        summary.put("other", 0);  // Placeholder for other statuses
        summary.put("start", suiteStartTime);
        summary.put("stop", suiteEndTime);
        summary.put("suites", context.getAllTestMethods().length);

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

    @Override
    public void beforeConfiguration(ITestResult result) {
        beforeAfterDuration -= System.currentTimeMillis();  // Track configuration start time
    }

    @Override
    public void onConfigurationSuccess(ITestResult result) {
        beforeAfterDuration += System.currentTimeMillis();  // Add configuration end time
    }

    @Override
    public void onConfigurationFailure(ITestResult result) {
        beforeAfterDuration += System.currentTimeMillis();  // Add failed configuration time
    }

    @Override
    public void onConfigurationSkip(ITestResult result) {
        beforeAfterDuration += System.currentTimeMillis();  // Add skipped configuration time
    }

    private void recordTestResult(ITestResult result, String status) {
        long testStartTime = result.getStartMillis();
        long testEndTime = result.getEndMillis();
        Map<String, Object> testDetails = new HashMap<>();
        testDetails.put("name", result.getMethod().getMethodName());
        testDetails.put("status", status);
        testDetails.put("duration", testEndTime - testStartTime);
        testDetails.put("start", testStartTime);
        testDetails.put("stop", testEndTime);
        testDetails.put("rawStatus", status);
        testDetails.put("tags", new ArrayList<>());  // Placeholder for tags
        testDetails.put("type", "e2e");
        testDetails.put("filePath", result.getTestClass().getName());
        testDetails.put("retries", 0);  // Default retries as 0
        testDetails.put("flaky", false);  // Placeholder for flaky status

        // Add steps if applicable (example steps - replace with actual steps if needed)
        List<Map<String, String>> steps = new ArrayList<>();
        steps.add(Map.of("name", "Step 1", "status", "passed"));
        steps.add(Map.of("name", "Step 2", "status", "passed"));
        testDetails.put("steps", steps);

        // Suite and extra info
        testDetails.put("suite", result.getTestClass().getName() + " > " + result.getMethod().getMethodName());
        testDetails.put("extra", Map.of("annotations", new ArrayList<>()));  // Placeholder for annotations

        tests.add(testDetails);
    }
}
