import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { l as MessageCircle, s as Send, t as X, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { E as isRedirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { i as LANGUAGES, n as APP_NAME, r as APP_SHORT } from "./constants-BCCCNdz0.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { a as sanitizeInput } from "./helpers-n7cuZdJ9.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BQq7kucB.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Ct-WOAO0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var styles_default = "/assets/styles-B_E7PA-B.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
/**
* Web Vitals monitoring utilities for StadiumIQ.
* Observes Core Web Vitals (LCP, CLS, FID) using the PerformanceObserver API
* and logs them to the console for performance analysis.
*
* @module vitals
*/
/**
* Initializes Web Vitals monitoring via PerformanceObserver.
* Tracks Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).
* Silently no-ops in environments without PerformanceObserver support.
*
* @returns {void}
*
* @example
* // Call once at app startup
* initVitals();
*/
function initVitals() {
	if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
	try {
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lcp = entries[entries.length - 1];
			if (lcp) console.log(`[StadiumIQ Vitals] LCP: ${Math.round(lcp.startTime)}ms`);
		}).observe({
			type: "largest-contentful-paint",
			buffered: true
		});
	} catch {}
	try {
		new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				const shift = entry;
				if (shift.value !== void 0) console.log(`[StadiumIQ Vitals] CLS entry: ${shift.value.toFixed(4)}`);
			});
		}).observe({
			type: "layout-shift",
			buffered: true
		});
	} catch {}
	try {
		new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				const fid = entry;
				if (fid.processingStart !== void 0) {
					const delay = fid.processingStart - entry.startTime;
					console.log(`[StadiumIQ Vitals] FID: ${Math.round(delay)}ms`);
				}
			});
		}).observe({
			type: "first-input",
			buffered: true
		});
	} catch {}
}
/**
* @fileoverview Navbar component for StadiumIQ.
* Renders the sticky top navigation bar with skip-to-main link,
* primary nav links, and a responsive mobile hamburger menu.
*
* @module Navbar
*/
/** Navigation link configuration */
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/map",
		label: "Map"
	},
	{
		to: "/transport",
		label: "Transport"
	},
	{
		to: "/schedule",
		label: "Schedule"
	},
	{
		to: "/accessibility",
		label: "Accessibility"
	},
	{
		to: "/staff",
		label: "Staff"
	}
];
/**
* Primary navigation bar for StadiumIQ.
* Includes an accessibility skip-link, branding, desktop nav links,
* and a `<details>`-based mobile menu (no JS overhead).
*
* @returns {JSX.Element} The sticky header navigation element
*/
function NavbarBase() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		role: "banner",
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#main",
			className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground",
			children: "Skip to main content"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			role: "navigation",
			"aria-label": "Primary",
			className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					"aria-label": `${APP_SHORT} home`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground font-black",
						children: "SF"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold tracking-wide text-primary",
							children: APP_SHORT
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "FIFA World Cup 2026"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-1 md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
						activeProps: { className: "rounded-md px-3 py-2 text-sm font-medium text-primary bg-accent" },
						activeOptions: { exact: l.to === "/" },
						children: l.label
					}) }, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "relative md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						"aria-label": "Open menu",
						className: "cursor-pointer list-none rounded-md border border-border px-3 py-2 text-sm",
						children: "Menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover p-2 shadow-xl",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent",
							children: l.label
						}) }, l.to))
					})]
				})
			]
		})]
	});
}
/**
* Memoised Navbar — re-renders only when parent forces an update.
* Since the navbar has no dynamic props, memoisation eliminates all
* unnecessary re-renders caused by route-level state changes.
*/
var Navbar = (0, import_react.memo)(NavbarBase);
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* @fileoverview Chat server function for StadiumIQ.
* Exposes a TanStack Start server function that forwards chat messages
* to the Lovable AI gateway (backed by Google Gemini) with input validation,
* rate-limit error handling, and language-aware system prompting.
*
* @module chat.functions
*/
/**
* Zod schema for validating the chat API request payload.
* Limits message count (1–30) and individual message length (1–2000 chars)
* to prevent token budget overruns and abuse.
*/
var ChatInput = objectType({
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().min(1).max(2e3)
	})).min(1).max(30),
	/** BCP-47 language name used to instruct the model to reply in that language */
	language: stringType().max(20).optional()
});
/**
* TanStack Start server function — proxies a chat conversation to the Gemini model
* via the Lovable AI gateway. Runs exclusively on the server, keeping the API key
* out of the client bundle.
*
* @param {{ data: z.infer<typeof ChatInput> }} input - Validated chat payload
* @returns {Promise<{ reply: string }>} The assistant's reply text
*
* @throws {Error} When the API key is missing, the rate limit is exceeded,
*   AI credits are exhausted, or the upstream request fails.
*
* @example
* const { reply } = await chat({ data: { messages, language: "Español" } });
*/
var chatWithStadiumIQ = createServerFn({ method: "POST" }).inputValidator((data) => ChatInput.parse(data)).handler(createSsrRpc("21cb56a8e3b1399cc3f25c4206790f000fe690b1f1eb0ae2754e5aa55a1c05e0"));
/**
* Debounces a value by the specified delay.
* Useful for preventing rapid re-renders or API calls during fast user input.
*
* @template T - The type of the value to debounce
* @param {T} value - The value to debounce
* @param {number} [delay=300] - Delay in milliseconds before updating the debounced value
* @returns {T} The debounced value, updated only after the delay has passed
*
* @example
* const debouncedSearch = useDebounce(searchInput, 400);
* // debouncedSearch only updates 400ms after the user stops typing
*/
function useDebounce(value, delay = 300) {
	const [debouncedValue, setDebouncedValue] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);
	return debouncedValue;
}
/**
* @fileoverview AIAssistant — Multilingual GenAI chat widget for StadiumIQ.
* Provides a floating chat button and panel powered by the Gemini AI model
* via a TanStack Start server function. Supports 5 languages, rate limiting,
* input sanitisation, and keyboard-accessible interaction.
*
* @module AIAssistant
*/
/**
* Floating multilingual AI assistant widget for StadiumIQ.
* Renders a toggle button (bottom-right) that opens a chat panel powered by
* the Google Gemini AI model. Implements:
* - Client-side rate limiting (max {@link RATE_LIMIT_PER_MIN} msgs/min)
* - Input sanitisation via {@link sanitizeInput}
* - Debounced character counter to reduce re-renders during typing
* - Smooth scroll-to-bottom on new messages
* - Keyboard shortcut: Enter to send, Shift+Enter for newline
*
* @param {AIAssistantProps} props - Component props
* @returns {JSX.Element} The floating chat button and optional chat panel
*/
function AIAssistant({ seedMessage }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi! I'm StadiumIQ. Ask me about gates, transport, matches, or accessibility."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [lang, setLang] = (0, import_react.useState)("English");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const timestampsRef = (0, import_react.useRef)([]);
	const scrollRef = (0, import_react.useRef)(null);
	const chat = useServerFn(chatWithStadiumIQ);
	/** Debounced input value — used for character counter to reduce renders */
	const debouncedInput = useDebounce(input, 150);
	(0, import_react.useEffect)(() => {
		if (seedMessage && open) setInput(seedMessage);
	}, [seedMessage, open]);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, loading]);
	/**
	* Whether the send button/action should be enabled.
	* Memoised to avoid recomputing on every render.
	*/
	const canSend = (0, import_react.useMemo)(() => input.trim().length > 0 && !loading, [input, loading]);
	/**
	* Sends the current input to the AI assistant via the server function.
	* Performs rate-limit checking, sanitisation, and optimistic UI update.
	*
	* @returns {Promise<void>}
	*/
	const send = (0, import_react.useCallback)(async () => {
		const clean = sanitizeInput(input.trim());
		if (!clean) return;
		const now = Date.now();
		timestampsRef.current = timestampsRef.current.filter((t) => now - t < 6e4);
		if (timestampsRef.current.length >= 10) {
			setError("You're sending messages too quickly. Please wait a moment.");
			return;
		}
		timestampsRef.current.push(now);
		setError(null);
		const next = [...messages, {
			role: "user",
			content: clean
		}];
		setMessages(next);
		setInput("");
		setLoading(true);
		try {
			const { reply } = await chat({ data: {
				messages: next,
				language: lang
			} });
			setMessages((m) => [...m, {
				role: "assistant",
				content: reply || "…"
			}]);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	}, [
		input,
		messages,
		chat,
		lang
	]);
	/**
	* Keyboard handler for the textarea — sends message on Enter (without Shift).
	*
	* @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
	* @returns {void}
	*/
	const onKey = (0, import_react.useCallback)((e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}, [send]);
	/**
	* Toggles the chat panel open or closed.
	*
	* @returns {void}
	*/
	const toggleOpen = (0, import_react.useCallback)(() => setOpen((o) => !o), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"aria-label": open ? "Close AI assistant" : "Open AI assistant chat",
		onClick: toggleOpen,
		className: "fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-transform hover:scale-105",
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6" })
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-label": "StadiumIQ AI assistant",
		className: "fixed bottom-24 right-4 z-50 flex h-[32rem] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border bg-navy px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-bold text-primary",
					children: "StadiumIQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-muted-foreground",
					children: "Multilingual AI Assistance"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "Language",
					value: lang,
					onChange: (e) => setLang(e.target.value),
					className: "rounded-md border border-border bg-input px-2 py-1 text-xs",
					children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: l.label,
						children: l.label
					}, l.code))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				role: "log",
				"aria-live": "polite",
				"aria-atomic": "false",
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: [
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`,
							children: m.content
						})
					}, i)),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Thinking…"]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "alert",
						className: "rounded-md bg-destructive/20 p-2 text-xs text-destructive",
						children: error
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						"aria-label": "Message StadiumIQ",
						value: input,
						onChange: (e) => setInput(e.target.value.slice(0, 300)),
						onKeyDown: onKey,
						rows: 2,
						placeholder: "Ask about gates, matches, transport…",
						className: "flex-1 resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Send message",
						onClick: send,
						disabled: !canSend,
						className: "grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-right text-[10px] text-muted-foreground",
					children: [
						debouncedInput.length,
						"/",
						300
					]
				})]
			})
		]
	})] });
}
/**
* React Error Boundary component that catches JavaScript errors in its child
* component tree and displays a fallback UI instead of crashing the whole app.
*
* Implements React's `componentDidCatch` lifecycle for error logging and
* `getDerivedStateFromError` for graceful fallback rendering.
*
* @example
* <ErrorBoundary fallbackMessage="This section failed to load.">
*   <SomeComponent />
* </ErrorBoundary>
*/
var ErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}
	/**
	* Updates state so the next render shows the fallback UI.
	* @param {Error} error - The error that was thrown
	* @returns {ErrorBoundaryState} Updated state with error details
	*/
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	/**
	* Logs error details for diagnostics.
	* @param {Error} error - The caught error
	* @param {React.ErrorInfo} errorInfo - Component stack trace info
	* @returns {void}
	*/
	componentDidCatch(error, errorInfo) {
		console.error("[StadiumIQ] Uncaught component error:", error, errorInfo);
	}
	/**
	* Resets the error state, allowing the component tree to re-render.
	* @returns {void}
	*/
	handleReset = () => {
		this.setState({
			hasError: false,
			error: null
		});
	};
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "alert",
			className: "flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-4xl",
					"aria-hidden": "true",
					children: "🏟️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-destructive",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm text-muted-foreground",
					children: this.props.fallbackMessage ?? "StadiumIQ encountered an error. Please try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: this.handleReset,
					className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
					"aria-label": "Retry loading this section",
					children: "Try Again"
				})
			]
		});
		return this.props.children;
	}
};
/**
* @fileoverview Root route — App shell for StadiumIQ.
* Defines the HTML shell, global head metadata, resource hints,
* top-level navigation, error/not-found components, and the
* QueryClientProvider + ErrorBoundary wrapping the main content.
*
* @module __root
*/
/**
* Renders a friendly 404 page when a route is not found.
*
* @returns {JSX.Element} A centred 404 message with a home link
*/
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Go home"
				})
			]
		})
	});
}
/**
* Renders an error fallback when a route throws during rendering.
* Reports the error to Lovable telemetry and provides retry / go-home actions.
*
* @param {{ error: Error; reset: () => void }} props - Error details and reset callback
* @returns {JSX.Element} A centred error message with recovery options
*/
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input px-4 py-2 text-sm",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${APP_SHORT} — GenAI Smart Stadium & Tournament Operations · FIFA World Cup 2026` },
			{
				name: "description",
				content: "StadiumIQ: GenAI-enabled stadium operations for FIFA World Cup 2026. Real-time crowd management, multilingual AI assistance, navigation, transport, accessibility, and operational intelligence for fans, organizers, volunteers, and venue staff."
			},
			{
				name: "author",
				content: APP_NAME
			},
			{
				property: "og:title",
				content: `${APP_SHORT} — FIFA World Cup 2026`
			},
			{
				property: "og:description",
				content: "Smart Stadium Assistant powered by GenAI for fans, staff, and volunteers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "keywords",
				content: "stadium AI, FIFA World Cup 2026, crowd management, multilingual assistance, real-time decision support, tournament operations, operational intelligence, accessibility"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "dns-prefetch",
				href: "https://ai.gateway.lovable.dev"
			},
			{
				rel: "preconnect",
				href: "https://ai.gateway.lovable.dev"
			},
			{
				rel: "dns-prefetch",
				href: "https://generativelanguage.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://generativelanguage.googleapis.com"
			},
			{
				rel: "dns-prefetch",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
/**
* Outermost HTML shell rendered on the server.
* Wraps the entire application in `<html>` and `<body>` tags.
*
* @param {{ children: ReactNode }} props - Shell children (head + body content)
* @returns {JSX.Element} The `<html>` document shell
*/
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
/**
* Root application component rendered inside the shell.
* Provides:
* - `QueryClientProvider` for TanStack Query
* - `Navbar` sticky top navigation
* - `ErrorBoundary` wrapping the main page `<Outlet>`
* - `AIAssistant` floating chat widget
* - Initialises Web Vitals monitoring and idle-time preloading
*
* @returns {JSX.Element} The full application layout
*/
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	(0, import_react.useEffect)(() => {
		initVitals();
	}, []);
	(0, import_react.useEffect)(() => {
		if ("requestIdleCallback" in window) requestIdleCallback(() => {
			console.log(`[${APP_SHORT}] Preloading secondary resources during idle time`);
		}, { timeout: 2e3 });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				role: "main",
				className: "mx-auto max-w-7xl px-4 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
					fallbackMessage: "This page encountered an error. Please try again.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				role: "contentinfo",
				className: "mx-auto max-w-7xl px-4 pb-10 pt-6 text-center text-xs text-muted-foreground",
				children: [APP_SHORT, " · Tournament Operations · GenAI concierge for FIFA World Cup 2026"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIAssistant, {})
		]
	});
}
/**
* @fileoverview Transport route — Transportation Hub for StadiumIQ.
* Renders the multi-modal transport information page at `/transport`.
*
* @module routes/transport
*/
var $$splitComponentImporter$5 = () => import("./transport-vIsC8wQm.mjs");
var Route$5 = createFileRoute("/transport")({
	head: () => ({ meta: [{ title: "Transportation Hub — StadiumIQ · FIFA World Cup 2026" }, {
		name: "description",
		content: "StadiumIQ Transportation Hub: real-time metro, bus, rideshare, and parking info for your matchday at FIFA World Cup 2026."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
/**
* @fileoverview Staff route — Operational Intelligence portal for StadiumIQ.
* Renders the volunteer and staff coordination portal at `/staff`.
*
* @module routes/staff
*/
var $$splitComponentImporter$4 = () => import("./staff-EJ6E5DQy.mjs");
var Route$4 = createFileRoute("/staff")({
	head: () => ({ meta: [{ title: "Operational Intelligence — StadiumIQ Staff Portal · FIFA 2026" }, {
		name: "description",
		content: "StadiumIQ Operational Intelligence: staff and volunteer zone management, incident reporting, backup requests, and real-time activity log for FIFA World Cup 2026."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
/**
* @fileoverview Schedule route — Match Schedule page for StadiumIQ.
* Renders the FIFA World Cup 2026 match schedule with filters at `/schedule`.
*
* @module routes/schedule
*/
var $$splitComponentImporter$3 = () => import("./schedule-PpvAAZaE.mjs");
var Route$3 = createFileRoute("/schedule")({
	head: () => ({ meta: [{ title: "Match Schedule — StadiumIQ · FIFA World Cup 2026" }, {
		name: "description",
		content: "StadiumIQ match schedule: all FIFA World Cup 2026 fixtures with live countdown timers, group and venue filters, and real-time status updates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
/**
* @fileoverview Map route — Interactive Stadium Map for StadiumIQ.
* Renders the interactive SVG stadium navigation map at `/map`.
*
* @module routes/map
*/
var $$splitComponentImporter$2 = () => import("./map-DFppPlQ7.mjs");
var Route$2 = createFileRoute("/map")({
	head: () => ({ meta: [{ title: "Interactive Stadium Map — StadiumIQ · FIFA World Cup 2026" }, {
		name: "description",
		content: "StadiumIQ interactive map: live crowd levels, facilities, accessible routes, and directions for all stadium zones at FIFA World Cup 2026."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
/**
* @fileoverview Accessibility route — Multilingual Assistance & Accessibility Guide for StadiumIQ.
* Renders the accessibility services page at `/accessibility`.
*
* @module routes/accessibility
*/
var $$splitComponentImporter$1 = () => import("./accessibility-Bo3gAH9Z.mjs");
var Route$1 = createFileRoute("/accessibility")({
	head: () => ({ meta: [{ title: "Multilingual Assistance & Accessibility — StadiumIQ · FIFA 2026" }, {
		name: "description",
		content: "StadiumIQ accessibility guide: wheelchair routes, hearing loops, quiet zones, high-contrast mode, large text, and multilingual assistance for FIFA World Cup 2026."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
/**
* @fileoverview Home route — Dashboard landing page for StadiumIQ.
* Renders the hero section, emergency alerts, crowd management dashboard,
* and match schedule for fans arriving at the app.
*
* @module routes/index
*/
var $$splitComponentImporter = () => import("./routes-COIcqu_G.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [{ title: "StadiumIQ — Crowd Management System & Real-time Decision Support · FIFA 2026" }, {
		name: "description",
		content: "StadiumIQ home dashboard: live crowd management, real-time AI decision support, match schedule, and emergency alerts for FIFA World Cup 2026."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Home page component — the primary dashboard for StadiumIQ fans.
* Composes emergency alerts, hero banner, crowd management system,
* and match schedule in a single scrollable layout.
*
* @returns {JSX.Element} The home dashboard page
*/
var TransportRoute = Route$5.update({
	id: "/transport",
	path: "/transport",
	getParentRoute: () => Route$6
});
var StaffRoute = Route$4.update({
	id: "/staff",
	path: "/staff",
	getParentRoute: () => Route$6
});
var ScheduleRoute = Route$3.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => Route$6
});
var MapRoute = Route$2.update({
	id: "/map",
	path: "/map",
	getParentRoute: () => Route$6
});
var AccessibilityRoute = Route$1.update({
	id: "/accessibility",
	path: "/accessibility",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AccessibilityRoute,
	MapRoute,
	ScheduleRoute,
	StaffRoute,
	TransportRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
