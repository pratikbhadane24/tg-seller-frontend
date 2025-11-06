<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { authService } from '$lib/services/auth.service';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	onMount(() => {
		if (authService.isAuthenticated()) {
			goto('/dashboard');
		}
	});

	async function handleLogin(e: Event) {
		e.preventDefault();
		
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await authService.login({ email, password });
			if (response.success) {
				goto('/dashboard');
			}
		} catch (err: any) {
			error = err.message || 'Login failed. Please check your credentials.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Login - TG Seller Platform</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0 scan-lines opacity-30"></div>
	<div
		class="absolute top-0 left-0 w-96 h-96 bg-[var(--cyber-blue)] rounded-full filter blur-[150px] opacity-20 animate-pulse"
	></div>
	<div
		class="absolute bottom-0 right-0 w-96 h-96 bg-[var(--cyber-purple)] rounded-full filter blur-[150px] opacity-20 animate-pulse"
		style="animation-delay: 1s;"
	></div>

	<!-- Login Card -->
	<div class="cyber-card max-w-md w-full relative z-10 neon-border">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 cyber-text-glow" style="color: var(--cyber-blue)">
				SELLER LOGIN
			</h1>
			<p class="text-gray-400">Access your Telegram Seller Dashboard</p>
		</div>

		<form onsubmit={handleLogin}>
			<Input
				label="Email"
				id="email"
				type="email"
				bind:value={email}
				placeholder="seller@example.com"
				required
			/>

			<Input
				label="Password"
				id="password"
				type="password"
				bind:value={password}
				placeholder="••••••••"
				required
			/>

			{#if error}
				<div
					class="mb-4 p-3 bg-[var(--cyber-red)] bg-opacity-20 border border-[var(--cyber-red)] rounded text-sm"
				>
					{error}
				</div>
			{/if}

			<Button type="submit" {loading} variant="primary">
				{#if loading}
					Logging in...
				{:else}
					Login
				{/if}
			</Button>
		</form>

		<div class="mt-6 text-center">
			<p class="text-gray-400">
				Don't have an account?
				<a href="/register" class="text-[var(--cyber-blue)] hover:underline font-semibold">
					Register
				</a>
			</p>
		</div>
	</div>
</div>
