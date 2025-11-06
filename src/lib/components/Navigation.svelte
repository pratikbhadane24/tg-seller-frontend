<script lang="ts">
	import { page } from '$app/stores';
	import { authService } from '$lib/services/auth.service';

	const navItems = [
		{ path: '/dashboard', label: 'Dashboard', icon: '📊' },
		{ path: '/channels', label: 'Channels', icon: '📡' },
		{ path: '/members', label: 'Members', icon: '👥' },
		{ path: '/payments', label: 'Payments', icon: '💰' },
		{ path: '/grant-access', label: 'Grant Access', icon: '🔑' },
		{ path: '/settings', label: 'Settings', icon: '⚙️' }
	];

	function handleLogout() {
		if (confirm('Are you sure you want to logout?')) {
			authService.logout();
		}
	}
</script>

<nav class="bg-[var(--bg-card)] border-b border-[var(--border-color)] sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/dashboard" class="flex items-center gap-2">
					<span class="text-2xl font-bold cyber-text-glow" style="color: var(--cyber-blue)">
						TG SELLER
					</span>
				</a>
			</div>

			<!-- Navigation Links -->
			<div class="hidden md:flex items-center space-x-4">
				{#each navItems as item}
					<a
						href={item.path}
						class="px-3 py-2 rounded-md text-sm font-medium transition-all {$page.url.pathname ===
						item.path
							? 'bg-[var(--cyber-blue)] bg-opacity-20 text-[var(--cyber-blue)] border border-[var(--cyber-blue)]'
							: 'text-gray-300 hover:bg-[var(--bg-tertiary)] hover:text-white'}"
					>
						<span class="mr-1">{item.icon}</span>
						{item.label}
					</a>
				{/each}
			</div>

			<!-- Logout Button -->
			<div>
				<button
					onclick={handleLogout}
					class="px-4 py-2 text-sm font-medium text-[var(--cyber-red)] border border-[var(--cyber-red)] rounded hover:bg-[var(--cyber-red)] hover:bg-opacity-20 transition-all"
				>
					Logout
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	<div class="md:hidden border-t border-[var(--border-color)]">
		<div class="px-2 pt-2 pb-3 space-y-1">
			{#each navItems as item}
				<a
					href={item.path}
					class="block px-3 py-2 rounded-md text-base font-medium {$page.url.pathname ===
					item.path
						? 'bg-[var(--cyber-blue)] bg-opacity-20 text-[var(--cyber-blue)]'
						: 'text-gray-300 hover:bg-[var(--bg-tertiary)] hover:text-white'}"
				>
					<span class="mr-2">{item.icon}</span>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</nav>
