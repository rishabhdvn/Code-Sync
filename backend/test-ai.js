// Test script for AI integration
// This script tests the AIMLAPI integration

import dotenv from 'dotenv';
import { generateAIResponse } from './src/libs/blackbox.lib.js';

dotenv.config();

// Test function
async function testAIIntegration() {
  console.log('🧪 Testing AI integration with AIMLAPI...');
  
  try {
    // Check if API key is available
    const apiKey = process.env.AIMLAPI_GPT5;
    if (!apiKey) {
      console.error('❌ AIMLAPI_GPT5 environment variable is not set');
      console.log('Please set the AIMLAPI_GPT5 environment variable with your API key');
      return;
    }
    
    console.log('✅ AIMLAPI_GPT5 environment variable is set');
    
    // Test the generateAIResponse function
    console.log('🤖 Testing generateAIResponse function...');
    
    const testPrompt = 'What is the time complexity of quicksort?';
    const testContext = {
      problem: { title: 'Sorting Algorithm Analysis', difficulty: 'MEDIUM' },
      language: 'JavaScript',
      userCode: 'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) left.push(arr[i]);\n    else right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}'
    };
    
    console.log('📝 Test prompt:', testPrompt);
    console.log('📝 Test context:', {
      problemTitle: testContext.problem.title,
      difficulty: testContext.problem.difficulty,
      language: testContext.language,
      codeLength: testContext.userCode.length
    });
    
    console.log('🔄 Sending request to AIMLAPI...');
    const startTime = Date.now();
    
    try {
      const response = await generateAIResponse(testPrompt, testContext);
      const endTime = Date.now();
      
      console.log('✅ Response received successfully!');
      console.log(`⏱️ Response time: ${endTime - startTime}ms`);
      console.log('📊 Response length:', response.length);
      console.log('\n📝 Response preview (first 300 characters):');
      console.log('----------------------------------------');
      console.log(response.substring(0, 300) + '...');
      console.log('----------------------------------------');
      
      return true;
    } catch (error) {
      console.error('❌ Error generating AI response:', error.message);
      console.error('Full error:', error);
      
      // Provide troubleshooting guidance
      console.log('\n🔍 Troubleshooting tips:');
      if (error.message.includes('401')) {
        console.log('- Your API key may be invalid. Check that AIMLAPI_GPT5 contains a valid API key.');
      } else if (error.message.includes('429')) {
        console.log('- You may have exceeded your API rate limit. Wait a while before trying again.');
      } else if (error.message.includes('fetch')) {
        console.log('- There may be network connectivity issues. Check your internet connection.');
        console.log('- The AIMLAPI endpoint may be incorrect or down. Check the endpoint URL.');
      }
      
      return false;
    }
  } catch (error) {
    console.error('❌ Unexpected error during test:', error);
    return false;
  }
}

// Run the test
console.log('🚀 Starting AI integration test...');
testAIIntegration()
  .then(success => {
    if (success) {
      console.log('✅ AI integration test completed successfully!');
      process.exit(0);
    } else {
      console.error('❌ AI integration test failed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });