<script lang="ts">
	interface Props {
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary' | 'danger';
		disabled?: boolean;
		loading?: boolean;
		onclick?: () => void;
		children: any;
	}

	let {
		type = 'button',
		variant = 'primary',
		disabled = false,
		loading = false,
		onclick,
		children
	}: Props = $props();

	const variantClasses = {
		primary:
			'bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--cyber-purple)] hover:shadow-[0_0_20px_var(--cyber-blue)]',
		secondary:
			'bg-transparent border-2 border-[var(--cyber-blue)] text-[var(--cyber-blue)] hover:bg-[var(--cyber-blue)] hover:text-[var(--bg-primary)]',
		danger:
			'bg-gradient-to-r from-[var(--cyber-red)] to-[var(--cyber-pink)] hover:shadow-[0_0_20px_var(--cyber-red)]'
	};
</script>

<button
	{type}
	class="cyber-button {variantClasses[variant]} {disabled || loading
		? 'opacity-50 cursor-not-allowed'
		: ''}"
	{disabled}
	{onclick}
>
	{#if loading}
		<span class="flex items-center gap-2">
			<div class="spinner w-4 h-4 border-2"></div>
			Loading...
		</span>
	{:else}
		{@render children()}
	{/if}
</button>
