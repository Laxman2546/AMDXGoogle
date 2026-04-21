import apiClient from '../../../api/apiClient';

/**
 * Service to handle Condition / Sick Mode API requests
 */
export const conditionService = {
  async getConditionAdvice(data) {
    try {
      // Intentionally matching the frontend logic requested to the backend fallback,
      // or to the real endpoint if implemented
      const response = await apiClient.post('/analyze/condition', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get medical food advice. Please try again later.');
    }
  }
};
