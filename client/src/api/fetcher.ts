import { axiosInstance } from '@/src/lib/axios'

export const fetcher = {
  post: async (url: string, data?: any) => {
    try {
      const response = await axiosInstance.post(url, data && data)
      return response.data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  get: async (url: string) => {
    try {
      const response = await axiosInstance.get(url)
      return response.data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  patch: async (url: string, data: any) => {
    try {
      const response = await axiosInstance.patch(url, data && data)
      return response.data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  delete: async (url: string) => {
    try {
      const response = await axiosInstance.delete(url)
      return response.data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
