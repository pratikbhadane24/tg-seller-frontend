<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { authService } from '$lib/services/auth.service';

	let email = $state('');
	let password = $state('');
	let companyName = $state('');
	let loading = $state(false);
	let error = $state('');
	let success = $state(false);

	onMount(() => {
		if (authService.isAuthenticated()) {
			goto('/dashboard');
		}
	});

	async function handleRegister(e: Event) {
		e.preventDefault();
		
		if (!email || !password) {
			error = 'Please fill in all required fields';
			return;
		}

		if (password.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await authService.register({
				email,
				password,
				company_name: companyName || undefined
			});

			if (response.success) {
				success = true;
				setTimeout(() => {
					goto('/login');
				}, 2000);
			}
		} catch (err: any) {
			error = err.message || 'Registration failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Register - TG Seller Platform</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0 scan-lines opacity-30"></div>
	<div
		class="absolute top-0 right-0 w-96 h-96 bg-[var(--cyber-pink)] rounded-full filter blur-[150px] opacity-20 animate-pulse"
	></div>
	<div
		class="absolute bottom-0 left-0 w-96 h-96 bg-[var(--cyber-yellow)] rounded-full filter blur-[150px] opacity-20 animate-pulse"
		style="animation-delay: 1s;"
	></div>

	<!-- Register Card -->
	<div class="cyber-card max-w-md w-full relative z-10 neon-border">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-2 cyber-text-glow" style="color: var(--cyber-pink)">
				SELLER REGISTRATION
			</h1>
			<p class="text-gray-400">Create your Telegram Seller Account</p>
		</div>

		{#if success}
			<div
				class="mb-4 p-4 bg-[var(--cyber-green)] bg-opacity-20 border border-[var(--cyber-green)] rounded text-center"
			>
				<p class="font-semibold">Registration successful!</p>
				<p class="text-sm mt-1">Redirecting to login...</p>
			</div>
		{:else}
			<form onsubmit={handleRegister}>
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
					placeholder="At least 8 characters"
					required
				/>

				<Input
					label="Company Name"
					id="companyName"
					type="text"
					bind:value={companyName}
					placeholder="Optional"
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
						Creating Account...
					{:else}
						Register
					{/if}
				</Button>
			</form>

			<div class="mt-6 text-center">
				<p class="text-gray-400">
					Already have an account?
					<a href="/login" class="text-[var(--cyber-blue)] hover:underline font-semibold">
						Login
					</a>
				</p>
			</div>
		{/if}
	</div>
</div>
