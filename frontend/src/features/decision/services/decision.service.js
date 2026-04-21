import apiClient from '../../../api/apiClient';

/**
 * Service to handle Decision API requests
 */
export const decisionService = {
  async getDecision(data) {
    try {
      const response = await apiClient.post('/decision', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get food decision. Please try again later.');
    }
  }
};
