import { api } from './api';
import type {
	LoginRequest,
	RegisterRequest,
	AuthTokens,
	RegistrationData,
	Seller,
	SellerStats,
	StripeKeysRequest
} from '$lib/types/api';

import { goto } from '$lib/utils/navigation';

export const authService = {
	async register(data: RegisterRequest) {
		const response = await api.post<RegistrationData>('/api/sellers/register', data);
		if (response.success && response.data) {
			localStorage.setItem('api_key', response.data.api_key);
		}
		return response;
	},

	async login(data: LoginRequest) {
		const response = await api.post<AuthTokens>('/api/sellers/login', data);
		if (response.success && response.data) {
			localStorage.setItem('access_token', response.data.access_token);
			localStorage.setItem('refresh_token', response.data.refresh_token);
			localStorage.setItem('token_type', response.data.token_type);
		}
		return response;
	},

	logout() {
		localStorage.clear();
		goto('/login');
	},

	isAuthenticated(): boolean {
		return !!localStorage.getItem('access_token');
	}
};

export const sellerService = {
	async getProfile() {
		return api.get<Seller>('/api/sellers/me');
	},

	async getStats() {
		return api.get<SellerStats>('/api/sellers/stats');
	},

	async updateStripeKeys(data: StripeKeysRequest) {
		return api.post('/api/sellers/stripe-keys', data);
	}
};
