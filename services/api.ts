import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const register = (userData: any) => api.post("/users/register", userData)
export const login = (credentials: any) => api.post("/users/login", credentials)
export const getUserProfile = () => api.get("/users/profile")
export const updateUserProfile = (userData: any) => api.put("/users/profile", userData)

export const getVerificationStatus = () => api.get("/verification")
export const submitKYC = (kycData: any) => api.post("/verification", kycData)

export const createDeposit = (depositData: any) => api.post("/deposits", depositData)
export const getDeposits = () => api.get("/deposits")

export const createWithdrawal = (withdrawalData: any) => api.post("/withdrawals", withdrawalData)
export const getWithdrawals = () => api.get("/withdrawals")

export const getAffiliateInfo = () => api.get("/affiliates")
export const updateAffiliateInfo = (affiliateData: any) => api.put("/affiliates", affiliateData)

export const createTradingAccount = (accountData: any) => api.post("/trading-accounts", accountData)
export const getTradingAccounts = () => api.get("/trading-accounts")
export const updateTradingAccount = (accountId: string, accountData: any) =>
  api.put(`/trading-accounts/${accountId}`, accountData)

export default api

