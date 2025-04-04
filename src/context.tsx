import React from 'react'

export function createContext<ContextValueType extends object | null>(
	rootComponentName: string,
	defaultContext?: ContextValueType,
) {
	const Context = React.createContext<ContextValueType | undefined>(
		defaultContext,
	)

	const Provider: React.FC<
		ContextValueType & { children?: React.ReactNode }
	> = (props) => {
		const { children, ...context } = props
		// Only re-memoize when prop values change
		const value = React.useMemo(
			() => context,
			Object.values(context),
		) as ContextValueType
		return <Context value={value}>{children}</Context>
	}

	Provider.displayName = rootComponentName + 'Provider'

	function useContext(consumerName: string) {
		const context = React.use(Context)
		if (context) return context
		if (defaultContext !== undefined) return defaultContext
		// if a defaultContext wasn't specified, it's a required context.
		throw new Error(
			`\`${consumerName}\` must be used within \`${rootComponentName}\``,
		)
	}

	return [Provider, useContext, Context] as const
}
