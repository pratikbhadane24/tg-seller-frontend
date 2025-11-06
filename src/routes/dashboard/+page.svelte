<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import { sellerService } from '$lib/services/auth.service';
	import { authService } from '$lib/services/auth.service';
	import { formatCurrency } from '$lib/utils/format';
	import type { SellerStats } from '$lib/types/api';

	let loading = $state(true);
	let stats: SellerStats | null = $state(null);
	let error = $state('');

	onMount(async () => {
		if (!authService.isAuthenticated()) {
			goto('/login');
			return;
		}

		await loadStats();
	});

	async function loadStats() {
		loading = true;
		error = '';

		try {
			const response = await sellerService.getStats();
			if (response.success && response.data) {
				stats = response.data;
			}
		} catch (err: any) {
			error = err.message || 'Failed to load statistics';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Dashboard - TG Seller Platform</title>
</svelte:head>

<div class="min-h-screen bg-[var(--bg-primary)]">
	<Navigation />

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold cyber-text-glow mb-2" style="color: var(--cyber-blue)">
				DASHBOARD
			</h1>
			<p class="text-gray-400">Welcome back to your seller dashboard</p>
		</div>

		{#if loading}
			<Loading loading={true} />
		{:else if error}
			<div
				class="p-4 bg-[var(--cyber-red)] bg-opacity-20 border border-[var(--cyber-red)] rounded"
			>
				<p class="font-semibold">Error loading dashboard</p>
				<p class="text-sm mt-1">{error}</p>
				<button
					onclick={loadStats}
					class="mt-2 px-4 py-2 bg-[var(--cyber-red)] rounded text-sm font-semibold hover:opacity-80"
				>
					Retry
				</button>
			</div>
		{:else if stats}
			<!-- Stats Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatCard title="Total Channels" value={stats.total_channels} icon="📡" color="blue" />
				<StatCard
					title="Active Members"
					value={stats.active_members}
					icon="👥"
					color="green"
				/>
				<StatCard
					title="Total Revenue"
					value={formatCurrency(stats.total_revenue_cents)}
					icon="💰"
					color="purple"
				/>
				<StatCard title="All Members" value={stats.total_members} icon="📈" color="yellow" />
			</div>

			<!-- Quick Actions -->
			<div class="cyber-card">
				<h2 class="text-2xl font-bold mb-4" style="color: var(--cyber-blue)">Quick Actions</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<a
						href="/channels"
						class="p-4 bg-[var(--bg-tertiary)] rounded border border-[var(--border-color)] hover:border-[var(--cyber-blue)] transition-all text-center"
					>
						<div class="text-3xl mb-2">📡</div>
						<div class="font-semibold">Manage Channels</div>
						<div class="text-sm text-gray-400">Add or edit your channels</div>
					</a>
					<a
						href="/members"
						class="p-4 bg-[var(--bg-tertiary)] rounded border border-[var(--border-color)] hover:border-[var(--cyber-blue)] transition-all text-center"
					>
						<div class="text-3xl mb-2">👥</div>
						<div class="font-semibold">View Members</div>
						<div class="text-sm text-gray-400">Manage your subscribers</div>
					</a>
					<a
						href="/grant-access"
						class="p-4 bg-[var(--bg-tertiary)] rounded border border-[var(--border-color)] hover:border-[var(--cyber-blue)] transition-all text-center"
					>
						<div class="text-3xl mb-2">🔑</div>
						<div class="font-semibold">Grant Access</div>
						<div class="text-sm text-gray-400">Give channel access</div>
					</a>
				</div>
			</div>
		{/if}
	</main>
</div>
