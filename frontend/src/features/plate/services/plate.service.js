import apiClient from '../../../api/apiClient';

export const plateService = {
  async getPlateAnalysis(data) {
    try {
      // Mocking the backend as per prompt requirements if the backend isn't ready
      // const response = await apiClient.post('/analyze/plate', data);
      // return response.data;
      
      // MOCK FALLBACK TO PROVE UI WORKS IF ENDPOINT 404s
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        score: Math.floor(Math.random() * 40) + 60, // 60-100 score
        issues: [
          'High in simple carbohydrates',
          'Lacks sufficient dietary fiber',
          'Slightly high sodium content due to sauces'
        ],
        fixes: [
          'Add a side of fresh greens or cucumber salad',
          'Swap white rice for complex carbs like brown rice or quinoa',
          'Drink an extra glass of water to balance sodium'
        ]
      };
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to analyze plate. Please try again later.');
    }
  }
};
