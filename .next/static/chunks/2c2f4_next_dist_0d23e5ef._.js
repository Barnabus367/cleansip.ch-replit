(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/2c2f4_next_dist_0d23e5ef._.js", {

"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/router/utils/handle-smooth-scroll.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * Run function with `scroll-behavior: auto` applied to `<html/>`.
 * This css change will be reverted after the function finishes.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleSmoothScroll", {
    enumerable: true,
    get: function() {
        return handleSmoothScroll;
    }
});
function handleSmoothScroll(fn, options) {
    if (options === void 0) options = {};
    // if only the hash is changed, we don't need to disable smooth scrolling
    // we only care to prevent smooth scrolling when navigating to a new page to avoid jarring UX
    if (options.onlyHashChange) {
        fn();
        return;
    }
    const htmlElement = document.documentElement;
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        // In Chrome-based browsers we need to force reflow before calling `scrollTo`.
        // Otherwise it will not pickup the change in scrollBehavior
        // More info here: https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
} //# sourceMappingURL=handle-smooth-scroll.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$13_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, /**
 * OuterLayoutRouter handles the current segment as well as <Offscreen> rendering of other segments.
 * It can be rendered next to each other with a different `parallelRouterKey`, allowing for Parallel routes.
 */ "default", {
    enumerable: true,
    get: function() {
        return OuterLayoutRouter;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)"));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-dom-experimental/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _fetchserverresponse = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)");
const _unresolvedthenable = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)");
const _errorboundary = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)");
const _matchsegments = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)");
const _handlesmoothscroll = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/router/utils/handle-smooth-scroll.js [app-client] (ecmascript)");
const _redirectboundary = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)");
const _errorboundary1 = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)");
const _createroutercachekey = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)");
const _hasinterceptionrouteincurrenttree = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/router-reducer/reducers/has-interception-route-in-current-tree.js [app-client] (ecmascript)");
/**
 * Add refetch marker to router state at the point of the current layout segment.
 * This ensures the response returned is not further down than the current layout segment.
 */ function walkAddRefetch(segmentPathToWalk, treeToRecreate) {
    if (segmentPathToWalk) {
        const [segment, parallelRouteKey] = segmentPathToWalk;
        const isLast = segmentPathToWalk.length === 2;
        if ((0, _matchsegments.matchSegment)(treeToRecreate[0], segment)) {
            if (treeToRecreate[1].hasOwnProperty(parallelRouteKey)) {
                if (isLast) {
                    const subTree = walkAddRefetch(undefined, treeToRecreate[1][parallelRouteKey]);
                    return [
                        treeToRecreate[0],
                        {
                            ...treeToRecreate[1],
                            [parallelRouteKey]: [
                                subTree[0],
                                subTree[1],
                                subTree[2],
                                'refetch'
                            ]
                        }
                    ];
                }
                return [
                    treeToRecreate[0],
                    {
                        ...treeToRecreate[1],
                        [parallelRouteKey]: walkAddRefetch(segmentPathToWalk.slice(2), treeToRecreate[1][parallelRouteKey])
                    }
                ];
            }
        }
    }
    return treeToRecreate;
}
const __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _reactdom.default.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
// TODO-APP: Replace with new React API for finding dom nodes without a `ref` when available
/**
 * Wraps ReactDOM.findDOMNode with additional logic to hide React Strict Mode warning
 */ function findDOMNode(instance) {
    // Tree-shake for server bundle
    if (typeof window === 'undefined') return null;
    // __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode is null during module init.
    // We need to lazily reference it.
    const internal_reactDOMfindDOMNode = __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode;
    return internal_reactDOMfindDOMNode(instance);
}
const rectProperties = [
    'bottom',
    'height',
    'left',
    'right',
    'top',
    'width',
    'x',
    'y'
];
/**
 * Check if a HTMLElement is hidden or fixed/sticky position
 */ function shouldSkipElement(element) {
    // we ignore fixed or sticky positioned elements since they'll likely pass the "in-viewport" check
    // and will result in a situation we bail on scroll because of something like a fixed nav,
    // even though the actual page content is offscreen
    if ([
        'sticky',
        'fixed'
    ].includes(getComputedStyle(element).position)) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.warn('Skipping auto-scroll behavior due to `position: sticky` or `position: fixed` on element:', element);
        }
        return true;
    }
    // Uses `getBoundingClientRect` to check if the element is hidden instead of `offsetParent`
    // because `offsetParent` doesn't consider document/body
    const rect = element.getBoundingClientRect();
    return rectProperties.every((item)=>rect[item] === 0);
}
/**
 * Check if the top corner of the HTMLElement is in the viewport.
 */ function topOfElementInViewport(element, viewportHeight) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= viewportHeight;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === 'top') {
        return document.body;
    }
    var _document_getElementById;
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return (_document_getElementById = document.getElementById(hashFragment)) != null ? _document_getElementById : document.getElementsByName(hashFragment)[0];
}
class InnerScrollAndFocusHandler extends _react.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        // Because this property is overwritten in handlePotentialScroll it's fine to always run it when true as it'll be set to false for subsequent renders.
        if (this.props.focusAndScrollRef.apply) {
            this.handlePotentialScroll();
        }
    }
    render() {
        return this.props.children;
    }
    constructor(...args){
        super(...args), this.handlePotentialScroll = ()=>{
            // Handle scroll and focus, it's only applied once in the first useEffect that triggers that changed.
            const { focusAndScrollRef, segmentPath } = this.props;
            if (focusAndScrollRef.apply) {
                // segmentPaths is an array of segment paths that should be scrolled to
                // if the current segment path is not in the array, the scroll is not applied
                // unless the array is empty, in which case the scroll is always applied
                if (focusAndScrollRef.segmentPaths.length !== 0 && !focusAndScrollRef.segmentPaths.some((scrollRefSegmentPath)=>segmentPath.every((segment, index)=>(0, _matchsegments.matchSegment)(segment, scrollRefSegmentPath[index])))) {
                    return;
                }
                let domNode = null;
                const hashFragment = focusAndScrollRef.hashFragment;
                if (hashFragment) {
                    domNode = getHashFragmentDomNode(hashFragment);
                }
                // `findDOMNode` is tricky because it returns just the first child if the component is a fragment.
                // This already caused a bug where the first child was a <link/> in head.
                if (!domNode) {
                    domNode = findDOMNode(this);
                }
                // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
                if (!(domNode instanceof Element)) {
                    return;
                }
                // Verify if the element is a HTMLElement and if we want to consider it for scroll behavior.
                // If the element is skipped, try to select the next sibling and try again.
                while(!(domNode instanceof HTMLElement) || shouldSkipElement(domNode)){
                    if ("TURBOPACK compile-time truthy", 1) {
                        var _domNode_parentElement;
                        if (((_domNode_parentElement = domNode.parentElement) == null ? void 0 : _domNode_parentElement.localName) === 'head') {
                        // TODO: We enter this state when metadata was rendered as part of the page or via Next.js.
                        // This is always a bug in Next.js and caused by React hoisting metadata.
                        // We need to replace `findDOMNode` in favor of Fragment Refs (when available) so that we can skip over metadata.
                        }
                    }
                    // No siblings found that match the criteria are found, so handle scroll higher up in the tree instead.
                    if (domNode.nextElementSibling === null) {
                        return;
                    }
                    domNode = domNode.nextElementSibling;
                }
                // State is mutated to ensure that the focus and scroll is applied only once.
                focusAndScrollRef.apply = false;
                focusAndScrollRef.hashFragment = null;
                focusAndScrollRef.segmentPaths = [];
                (0, _handlesmoothscroll.handleSmoothScroll)(()=>{
                    // In case of hash scroll, we only need to scroll the element into view
                    if (hashFragment) {
                        ;
                        domNode.scrollIntoView();
                        return;
                    }
                    // Store the current viewport height because reading `clientHeight` causes a reflow,
                    // and it won't change during this function.
                    const htmlElement = document.documentElement;
                    const viewportHeight = htmlElement.clientHeight;
                    // If the element's top edge is already in the viewport, exit early.
                    if (topOfElementInViewport(domNode, viewportHeight)) {
                        return;
                    }
                    // Otherwise, try scrolling go the top of the document to be backward compatible with pages
                    // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
                    // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
                    // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
                    htmlElement.scrollTop = 0;
                    // Scroll to domNode if domNode is not in viewport when scrolled to top of document
                    if (!topOfElementInViewport(domNode, viewportHeight)) {
                        // Scroll into view doesn't scroll horizontally by default when not needed
                        ;
                        domNode.scrollIntoView();
                    }
                }, {
                    // We will force layout by querying domNode position
                    dontForceLayout: true,
                    onlyHashChange: focusAndScrollRef.onlyHashChange
                });
                // Mutate after scrolling so that it can be read by `handleSmoothScroll`
                focusAndScrollRef.onlyHashChange = false;
                // Set focus on the element
                domNode.focus();
            }
        };
    }
}
function ScrollAndFocusHandler(param) {
    let { segmentPath, children } = param;
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant global layout router not mounted'), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerScrollAndFocusHandler, {
        segmentPath: segmentPath,
        focusAndScrollRef: context.focusAndScrollRef,
        children: children
    });
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter(param) {
    let { tree, segmentPath, cacheNode, url } = param;
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant global layout router not mounted'), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    const { changeByServerResponse, tree: fullTree } = context;
    // `rsc` represents the renderable node for this segment.
    // If this segment has a `prefetchRsc`, it's the statically prefetched data.
    // We should use that on initial render instead of `rsc`. Then we'll switch
    // to `rsc` when the dynamic response streams in.
    //
    // If no prefetch data is available, then we go straight to rendering `rsc`.
    const resolvedPrefetchRsc = cacheNode.prefetchRsc !== null ? cacheNode.prefetchRsc : cacheNode.rsc;
    // We use `useDeferredValue` to handle switching between the prefetched and
    // final values. The second argument is returned on initial render, then it
    // re-renders with the first argument.
    const rsc = (0, _react.useDeferredValue)(cacheNode.rsc, resolvedPrefetchRsc);
    // `rsc` is either a React node or a promise for a React node, except we
    // special case `null` to represent that this segment's data is missing. If
    // it's a promise, we need to unwrap it so we can determine whether or not the
    // data is missing.
    const resolvedRsc = typeof rsc === 'object' && rsc !== null && typeof rsc.then === 'function' ? (0, _react.use)(rsc) : rsc;
    if (!resolvedRsc) {
        // The data for this segment is not available, and there's no pending
        // navigation that will be able to fulfill it. We need to fetch more from
        // the server and patch the cache.
        // Check if there's already a pending request.
        let lazyData = cacheNode.lazyData;
        if (lazyData === null) {
            /**
       * Router state with refetch marker added
       */ // TODO-APP: remove ''
            const refetchTree = walkAddRefetch([
                '',
                ...segmentPath
            ], fullTree);
            const includeNextUrl = (0, _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(fullTree);
            cacheNode.lazyData = lazyData = (0, _fetchserverresponse.fetchServerResponse)(new URL(url, location.origin), {
                flightRouterState: refetchTree,
                nextUrl: includeNextUrl ? context.nextUrl : null
            }).then((serverResponse)=>{
                (0, _react.startTransition)(()=>{
                    changeByServerResponse({
                        previousTree: fullTree,
                        serverResponse
                    });
                });
                return serverResponse;
            });
            // Suspend while waiting for lazyData to resolve
            (0, _react.use)(lazyData);
        }
        // Suspend infinitely as `changeByServerResponse` will cause a different part of the tree to be rendered.
        // A falsey `resolvedRsc` indicates missing data -- we should not commit that branch, and we need to wait for the data to arrive.
        (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    }
    // If we get to this point, then we know we have something we can render.
    const subtree = /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: tree,
            parentCacheNode: cacheNode,
            parentSegmentPath: segmentPath,
            // TODO-APP: overriding of url for parallel routes
            url: url
        },
        children: resolvedRsc
    });
    // Ensure root layout is not wrapped in a div as the root layout renders `<html>`
    return subtree;
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary(param) {
    let { loading, children } = param;
    // If loading is a promise, unwrap it. This happens in cases where we haven't
    // yet received the loading data from the server — which includes whether or
    // not this layout has a loading component at all.
    //
    // It's OK to suspend here instead of inside the fallback because this
    // promise will resolve simultaneously with the data for the segment itself.
    // So it will never suspend for longer than it would have if we didn't use
    // a Suspense fallback at all.
    let loadingModuleData;
    if (typeof loading === 'object' && loading !== null && typeof loading.then === 'function') {
        const promiseForLoading = loading;
        loadingModuleData = (0, _react.use)(promiseForLoading);
    } else {
        loadingModuleData = loading;
    }
    if (loadingModuleData) {
        const loadingRsc = loadingModuleData[0];
        const loadingStyles = loadingModuleData[1];
        const loadingScripts = loadingModuleData[2];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
            fallback: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    loadingStyles,
                    loadingScripts,
                    loadingRsc
                ]
            }),
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
function OuterLayoutRouter(param) {
    let { parallelRouterKey, error, errorStyles, errorScripts, templateStyles, templateScripts, template, notFound, forbidden, unauthorized } = param;
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant expected layout router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E56",
            enumerable: false,
            configurable: true
        });
    }
    const { parentTree, parentCacheNode, parentSegmentPath, url } = context;
    // Get the CacheNode for this segment by reading it from the parent segment's
    // child map.
    const parentParallelRoutes = parentCacheNode.parallelRoutes;
    let segmentMap = parentParallelRoutes.get(parallelRouterKey);
    // If the parallel router cache node does not exist yet, create it.
    // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
    if (!segmentMap) {
        segmentMap = new Map();
        parentParallelRoutes.set(parallelRouterKey, segmentMap);
    }
    // Get the active segment in the tree
    // The reason arrays are used in the data format is that these are transferred from the server to the browser so it's optimized to save bytes.
    const parentTreeSegment = parentTree[0];
    const tree = parentTree[1][parallelRouterKey];
    const treeSegment = tree[0];
    const segmentPath = parentSegmentPath === null ? // the code. We should clean this up.
    [
        parallelRouterKey
    ] : parentSegmentPath.concat([
        parentTreeSegment,
        parallelRouterKey
    ]);
    // The "state" key of a segment is the one passed to React — it represents the
    // identity of the UI tree. Whenever the state key changes, the tree is
    // recreated and the state is reset. In the App Router model, search params do
    // not cause state to be lost, so two segments with the same segment path but
    // different search params should have the same state key.
    //
    // The "cache" key of a segment, however, *does* include the search params, if
    // it's possible that the segment accessed the search params on the server.
    // (This only applies to page segments; layout segments cannot access search
    // params on the server.)
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(treeSegment);
    const stateKey = (0, _createroutercachekey.createRouterCacheKey)(treeSegment, true) // no search params
    ;
    // Read segment path from the parallel router cache node.
    let cacheNode = segmentMap.get(cacheKey);
    if (cacheNode === undefined) {
        // When data is not available during rendering client-side we need to fetch
        // it from the server.
        const newLazyCacheNode = {
            lazyData: null,
            rsc: null,
            prefetchRsc: null,
            head: null,
            prefetchHead: null,
            parallelRoutes: new Map(),
            loading: null
        };
        // Flight data fetch kicked off during render and put into the cache.
        cacheNode = newLazyCacheNode;
        segmentMap.set(cacheKey, newLazyCacheNode);
    }
    /*
    - Error boundary
      - Only renders error boundary if error component is provided.
      - Rendered for each segment to ensure they have their own error state.
    - Loading boundary
      - Only renders suspense boundary if loading components is provided.
      - Rendered for each segment to ensure they have their own loading state.
      - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
  */ // TODO: The loading module data for a segment is stored on the parent, then
    // applied to each of that parent segment's parallel route slots. In the
    // simple case where there's only one parallel route (the `children` slot),
    // this is no different from if the loading module data where stored on the
    // child directly. But I'm not sure this actually makes sense when there are
    // multiple parallel routes. It's not a huge issue because you always have
    // the option to define a narrower loading boundary for a particular slot. But
    // this sort of smells like an implementation accident to me.
    const loadingModuleData = parentCacheNode.loading;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_approutercontextsharedruntime.TemplateContext.Provider, {
        value: /*#__PURE__*/ (0, _jsxruntime.jsx)(ScrollAndFocusHandler, {
            segmentPath: segmentPath,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
                errorComponent: error,
                errorStyles: errorStyles,
                errorScripts: errorScripts,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(LoadingBoundary, {
                    loading: loadingModuleData,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary1.HTTPAccessFallbackBoundary, {
                        notFound: notFound,
                        forbidden: forbidden,
                        unauthorized: unauthorized,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_redirectboundary.RedirectBoundary, {
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerLayoutRouter, {
                                url: url,
                                tree: tree,
                                cacheNode: cacheNode,
                                segmentPath: segmentPath
                            })
                        })
                    })
                })
            })
        }),
        children: [
            templateStyles,
            templateScripts,
            template
        ]
    }, stateKey);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=layout-router.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontextsharedruntime.TemplateContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=render-from-template-context.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvariantError", {
    enumerable: true,
    get: function() {
        return InvariantError;
    }
});
class InvariantError extends Error {
    constructor(message, options){
        super("Invariant: " + (message.endsWith('.') ? message : message + '.') + " This is a bug in Next.js.", options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReflectAdapter", {
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    describeHasCheckingStringProperty: null,
    describeStringPropertyAccess: null,
    wellKnownProperties: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    describeHasCheckingStringProperty: function() {
        return describeHasCheckingStringProperty;
    },
    describeStringPropertyAccess: function() {
        return describeStringPropertyAccess;
    },
    wellKnownProperties: function() {
        return wellKnownProperties;
    }
});
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return "`" + target + "." + prop + "`";
    }
    return "`" + target + "[" + JSON.stringify(prop) + "]`";
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
}
const wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    // fallthrough
    'then',
    'catch',
    'finally',
    // React Promise extension
    // fallthrough
    'status',
    // React introspection
    'displayName',
    // Common tested properties
    // fallthrough
    'toJSON',
    '$$typeof',
    '__esModule'
]); //# sourceMappingURL=reflect-utils.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeUntrackedExoticSearchParamsWithDevWarnings", {
    enumerable: true,
    get: function() {
        return makeUntrackedExoticSearchParamsWithDevWarnings;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedSearchParams = new WeakMap();
function makeUntrackedExoticSearchParamsWithDevWarnings(underlyingSearchParams) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const proxiedProperties = new Set();
    const unproxiedProperties = [];
    const promise = Promise.resolve(underlyingSearchParams);
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
            // These properties cannot be shadowed because they need to be the
            // true underlying value for Promises to work correctly at runtime
            unproxiedProperties.push(prop);
        } else {
            proxiedProperties.add(prop);
            promise[prop] = underlyingSearchParams[prop];
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            warnForSyncSpread();
            return Reflect.ownKeys(target);
        }
    });
    CachedSearchParams.set(underlyingSearchParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error("A searchParam property was accessed directly with " + expression + ". " + "`searchParams` should be unwrapped with `React.use()` before accessing its properties. " + "Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis");
}
function warnForSyncSpread() {
    console.error("The keys of `searchParams` were accessed directly. " + "`searchParams` should be unwrapped with `React.use()` before accessing its properties. " + "Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis");
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=search-params.browser.dev.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$13_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const createRenderSearchParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)").makeUntrackedExoticSearchParamsWithDevWarnings : ("TURBOPACK unreachable", undefined);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=search-params.browser.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeDynamicallyTrackedExoticParamsWithDevWarnings", {
    enumerable: true,
    get: function() {
        return makeDynamicallyTrackedExoticParamsWithDevWarnings;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedParams = new WeakMap();
function makeDynamicallyTrackedExoticParamsWithDevWarnings(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(underlyingParams);
    const proxiedProperties = new Set();
    const unproxiedProperties = [];
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
            promise[prop] = underlyingParams[prop];
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (proxiedProperties.has(prop)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys (target) {
            warnForEnumeration(unproxiedProperties);
            return Reflect.ownKeys(target);
        }
    });
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error("A param property was accessed directly with " + expression + ". `params` is now a Promise and should be unwrapped with `React.use()` before accessing properties of the underlying params object. In this version of Next.js direct access to param properties is still supported to facilitate migration but in a future version you will be required to unwrap `params` with `React.use()`.");
}
function warnForEnumeration(missingProperties) {
    if (missingProperties.length) {
        const describedMissingProperties = describeListOfPropertyNames(missingProperties);
        console.error("params are being enumerated incompletely missing these properties: " + describedMissingProperties + ". " + "`params` should be unwrapped with `React.use()` before using its value. " + "Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis");
    } else {
        console.error("params are being enumerated. " + "`params` should be unwrapped with `React.use()` before using its value. " + "Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis");
    }
}
function describeListOfPropertyNames(properties) {
    switch(properties.length){
        case 0:
            throw Object.defineProperty(new _invarianterror.InvariantError('Expected describeListOfPropertyNames to be called with a non-empty list of strings.'), "__NEXT_ERROR_CODE", {
                value: "E531",
                enumerable: false,
                configurable: true
            });
        case 1:
            return "`" + properties[0] + "`";
        case 2:
            return "`" + properties[0] + "` and `" + properties[1] + "`";
        default:
            {
                let description = '';
                for(let i = 0; i < properties.length - 1; i++){
                    description += "`" + properties[i] + "`, ";
                }
                description += ", and `" + properties[properties.length - 1] + "`";
                return description;
            }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=params.browser.dev.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$13_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const createRenderParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)").makeDynamicallyTrackedExoticParamsWithDevWarnings : ("TURBOPACK unreachable", undefined);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=params.browser.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$13_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", {
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
});
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Dynamic IO is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache((key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if ("TURBOPACK compile-time truthy", 1) {
            var _stack;
            const callStackFrames = (_stack = new Error().stack) == null ? void 0 : _stack.split('\n');
            if (callStackFrames === undefined || callStackFrames.length < 4) {
                logErrorOrWarn(message);
            } else {
                // Error:
                //   logDedupedError
                //   asyncApiBeingAccessedSynchronously
                //   <userland callsite>
                // TODO: This breaks if sourcemaps with ignore lists are enabled.
                const key = callStackFrames[4];
                errorRef.current = message;
                flushCurrentErrorIfNew(key);
            }
        } else {
            "TURBOPACK unreachable";
        }
    };
} //# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "afterTaskAsyncStorageInstance", {
    enumerable: true,
    get: function() {
        return afterTaskAsyncStorageInstance;
    }
});
const _asynclocalstorage = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/async-local-storage.js [app-client] (ecmascript)");
const afterTaskAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)(); //# sourceMappingURL=after-task-async-storage-instance.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "afterTaskAsyncStorage", {
    enumerable: true,
    get: function() {
        return _aftertaskasyncstorageinstance.afterTaskAsyncStorageInstance;
    }
});
const _aftertaskasyncstorageinstance = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js [app-client] (ecmascript)"); //# sourceMappingURL=after-task-async-storage.external.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/utils.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isRequestAPICallableInsideAfter: null,
    throwForSearchParamsAccessInUseCache: null,
    throwWithStaticGenerationBailoutError: null,
    throwWithStaticGenerationBailoutErrorWithDynamicError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isRequestAPICallableInsideAfter: function() {
        return isRequestAPICallableInsideAfter;
    },
    throwForSearchParamsAccessInUseCache: function() {
        return throwForSearchParamsAccessInUseCache;
    },
    throwWithStaticGenerationBailoutError: function() {
        return throwWithStaticGenerationBailoutError;
    },
    throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return throwWithStaticGenerationBailoutErrorWithDynamicError;
    }
});
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/static-generation-bailout.js [app-client] (ecmascript)");
const _aftertaskasyncstorageexternal = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js [app-client] (ecmascript)");
function throwWithStaticGenerationBailoutError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E576",
        enumerable: false,
        configurable: true
    });
}
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(route) {
    throw Object.defineProperty(new Error(`Route ${route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E634",
        enumerable: false,
        configurable: true
    });
}
function isRequestAPICallableInsideAfter() {
    const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
    return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === 'action';
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/search-params.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$13_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createPrerenderSearchParamsForClientPage: null,
    createSearchParamsFromClient: null,
    createServerSearchParamsForMetadata: null,
    createServerSearchParamsForServerPage: null,
    makeErroringExoticSearchParamsForUseCache: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createPrerenderSearchParamsForClientPage: function() {
        return createPrerenderSearchParamsForClientPage;
    },
    createSearchParamsFromClient: function() {
        return createSearchParamsFromClient;
    },
    createServerSearchParamsForMetadata: function() {
        return createServerSearchParamsForMetadata;
    },
    createServerSearchParamsForServerPage: function() {
        return createServerSearchParamsForServerPage;
    },
    makeErroringExoticSearchParamsForUseCache: function() {
        return makeErroringExoticSearchParamsForUseCache;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/dynamic-rendering-utils.js [app-client] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/utils.js [app-client] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/lib/scheduler.js [app-client] (ecmascript)");
function createSearchParamsFromClient(underlyingSearchParams, workStore) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createPrerenderSearchParams(workStore, workUnitStore);
            default:
        }
    }
    return createRenderSearchParams(underlyingSearchParams, workStore);
}
const createServerSearchParamsForMetadata = createServerSearchParamsForServerPage;
function createServerSearchParamsForServerPage(underlyingSearchParams, workStore) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createPrerenderSearchParams(workStore, workUnitStore);
            default:
        }
    }
    return createRenderSearchParams(underlyingSearchParams, workStore);
}
function createPrerenderSearchParamsForClientPage(workStore) {
    if (workStore.forceStatic) {
        // When using forceStatic we override all other logic and always just return an empty
        // dictionary object.
        return Promise.resolve({});
    }
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (prerenderStore && prerenderStore.type === 'prerender') {
        // dynamicIO Prerender
        // We're prerendering in a mode that aborts (dynamicIO) and should stall
        // the promise to ensure the RSC side is considered dynamic
        return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`searchParams`');
    }
    // We're prerendering in a mode that does not aborts. We resolve the promise without
    // any tracking because we're just transporting a value from server to client where the tracking
    // will be applied.
    return Promise.resolve({});
}
function createPrerenderSearchParams(workStore, prerenderStore) {
    if (workStore.forceStatic) {
        // When using forceStatic we override all other logic and always just return an empty
        // dictionary object.
        return Promise.resolve({});
    }
    if (prerenderStore.type === 'prerender') {
        // We are in a dynamicIO (PPR or otherwise) prerender
        return makeAbortingExoticSearchParams(workStore.route, prerenderStore);
    }
    // The remaining cases are prerender-ppr and prerender-legacy
    // We are in a legacy static generation and need to interrupt the prerender
    // when search params are accessed.
    return makeErroringExoticSearchParams(workStore, prerenderStore);
}
function createRenderSearchParams(underlyingSearchParams, workStore) {
    if (workStore.forceStatic) {
        // When using forceStatic we override all other logic and always just return an empty
        // dictionary object.
        return Promise.resolve({});
    } else {
        if (("TURBOPACK compile-time value", "development") === 'development' && !workStore.isPrefetchRequest) {
            return makeDynamicallyTrackedExoticSearchParamsWithDevWarnings(underlyingSearchParams, workStore);
        } else {
            return makeUntrackedExoticSearchParams(underlyingSearchParams, workStore);
        }
    }
}
const CachedSearchParams = new WeakMap();
const CachedSearchParamsForUseCache = new WeakMap();
function makeAbortingExoticSearchParams(route, prerenderStore) {
    const cachedSearchParams = CachedSearchParams.get(prerenderStore);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`searchParams`');
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (Object.hasOwn(promise, prop)) {
                // The promise has this property directly. we must return it.
                // We know it isn't a dynamic access because it can only be something
                // that was previously written to the promise and thus not an underlying searchParam value
                return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
            switch(prop){
                case 'then':
                    {
                        const expression = '`await searchParams`, `searchParams.then`, or similar';
                        (0, _dynamicrendering.annotateDynamicAccess)(expression, prerenderStore);
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                    }
                case 'status':
                    {
                        const expression = '`use(searchParams)`, `searchParams.status`, or similar';
                        (0, _dynamicrendering.annotateDynamicAccess)(expression, prerenderStore);
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                    }
                default:
                    {
                        if (typeof prop === 'string' && !_reflectutils.wellKnownProperties.has(prop)) {
                            const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                            const error = createSearchAccessError(route, expression);
                            (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
                        }
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                    }
            }
        },
        has (target, prop) {
            // We don't expect key checking to be used except for testing the existence of
            // searchParams so we make all has tests trigger dynamic. this means that `promise.then`
            // can resolve to the then function on the Promise prototype but 'then' in promise will assume
            // you are testing whether the searchParams has a 'then' property.
            if (typeof prop === 'string') {
                const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                const error = createSearchAccessError(route, expression);
                (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
            }
            return _reflect.ReflectAdapter.has(target, prop);
        },
        ownKeys () {
            const expression = '`{...searchParams}`, `Object.keys(searchParams)`, or similar';
            const error = createSearchAccessError(route, expression);
            (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
        }
    });
    CachedSearchParams.set(prerenderStore, proxiedPromise);
    return proxiedPromise;
}
function makeErroringExoticSearchParams(workStore, prerenderStore) {
    const cachedSearchParams = CachedSearchParams.get(workStore);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const underlyingSearchParams = {};
    // For search params we don't construct a ReactPromise because we want to interrupt
    // rendering on any property access that was not set from outside and so we only want
    // to have properties like value and status if React sets them.
    const promise = Promise.resolve(underlyingSearchParams);
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (Object.hasOwn(promise, prop)) {
                // The promise has this property directly. we must return it.
                // We know it isn't a dynamic access because it can only be something
                // that was previously written to the promise and thus not an underlying searchParam value
                return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
            switch(prop){
                case 'then':
                    {
                        const expression = '`await searchParams`, `searchParams.then`, or similar';
                        if (workStore.dynamicShouldError) {
                            (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(workStore.route, expression);
                        } else if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no dynamicIO)
                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                        }
                        return;
                    }
                case 'status':
                    {
                        const expression = '`use(searchParams)`, `searchParams.status`, or similar';
                        if (workStore.dynamicShouldError) {
                            (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(workStore.route, expression);
                        } else if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no dynamicIO)
                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                        }
                        return;
                    }
                default:
                    {
                        if (typeof prop === 'string' && !_reflectutils.wellKnownProperties.has(prop)) {
                            const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                            if (workStore.dynamicShouldError) {
                                (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(workStore.route, expression);
                            } else if (prerenderStore.type === 'prerender-ppr') {
                                // PPR Prerender (no dynamicIO)
                                (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                            } else {
                                // Legacy Prerender
                                (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                            }
                        }
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                    }
            }
        },
        has (target, prop) {
            // We don't expect key checking to be used except for testing the existence of
            // searchParams so we make all has tests trigger dynamic. this means that `promise.then`
            // can resolve to the then function on the Promise prototype but 'then' in promise will assume
            // you are testing whether the searchParams has a 'then' property.
            if (typeof prop === 'string') {
                const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                if (workStore.dynamicShouldError) {
                    (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(workStore.route, expression);
                } else if (prerenderStore.type === 'prerender-ppr') {
                    // PPR Prerender (no dynamicIO)
                    (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                } else {
                    // Legacy Prerender
                    (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                }
                return false;
            }
            return _reflect.ReflectAdapter.has(target, prop);
        },
        ownKeys () {
            const expression = '`{...searchParams}`, `Object.keys(searchParams)`, or similar';
            if (workStore.dynamicShouldError) {
                (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(workStore.route, expression);
            } else if (prerenderStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
            } else {
                // Legacy Prerender
                (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
            }
        }
    });
    CachedSearchParams.set(workStore, proxiedPromise);
    return proxiedPromise;
}
function makeErroringExoticSearchParamsForUseCache(workStore) {
    const cachedSearchParams = CachedSearchParamsForUseCache.get(workStore);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const promise = Promise.resolve({});
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (Object.hasOwn(promise, prop)) {
                // The promise has this property directly. we must return it. We know it
                // isn't a dynamic access because it can only be something that was
                // previously written to the promise and thus not an underlying
                // searchParam value
                return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
            if (typeof prop === 'string' && (prop === 'then' || !_reflectutils.wellKnownProperties.has(prop))) {
                (0, _utils.throwForSearchParamsAccessInUseCache)(workStore.route);
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        has (target, prop) {
            // We don't expect key checking to be used except for testing the existence of
            // searchParams so we make all has tests throw an error. this means that `promise.then`
            // can resolve to the then function on the Promise prototype but 'then' in promise will assume
            // you are testing whether the searchParams has a 'then' property.
            if (typeof prop === 'string' && (prop === 'then' || !_reflectutils.wellKnownProperties.has(prop))) {
                (0, _utils.throwForSearchParamsAccessInUseCache)(workStore.route);
            }
            return _reflect.ReflectAdapter.has(target, prop);
        },
        ownKeys () {
            (0, _utils.throwForSearchParamsAccessInUseCache)(workStore.route);
        }
    });
    CachedSearchParamsForUseCache.set(workStore, proxiedPromise);
    return proxiedPromise;
}
function makeUntrackedExoticSearchParams(underlyingSearchParams, store) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    // We don't use makeResolvedReactPromise here because searchParams
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(underlyingSearchParams);
    CachedSearchParams.set(underlyingSearchParams, promise);
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (!_reflectutils.wellKnownProperties.has(prop)) {
            Object.defineProperty(promise, prop, {
                get () {
                    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(store, workUnitStore);
                    return underlyingSearchParams[prop];
                },
                set (value) {
                    Object.defineProperty(promise, prop, {
                        value,
                        writable: true,
                        enumerable: true
                    });
                },
                enumerable: true,
                configurable: true
            });
        }
    });
    return promise;
}
function makeDynamicallyTrackedExoticSearchParamsWithDevWarnings(underlyingSearchParams, store) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const proxiedProperties = new Set();
    const unproxiedProperties = [];
    // We have an unfortunate sequence of events that requires this initialization logic. We want to instrument the underlying
    // searchParams object to detect if you are accessing values in dev. This is used for warnings and for things like the static prerender
    // indicator. However when we pass this proxy to our Promise.resolve() below the VM checks if the resolved value is a promise by looking
    // at the `.then` property. To our dynamic tracking logic this is indistinguishable from a `then` searchParam and so we would normally trigger
    // dynamic tracking. However we know that this .then is not real dynamic access, it's just how thenables resolve in sequence. So we introduce
    // this initialization concept so we omit the dynamic check until after we've constructed our resolved promise.
    let promiseInitialized = false;
    const proxiedUnderlying = new Proxy(underlyingSearchParams, {
        get (target, prop, receiver) {
            if (typeof prop === 'string' && promiseInitialized) {
                if (store.dynamicShouldError) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                    (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(store.route, expression);
                }
                const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
                (0, _dynamicrendering.trackDynamicDataInDynamicRender)(store, workUnitStore);
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (store.dynamicShouldError) {
                    const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                    (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(store.route, expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            if (store.dynamicShouldError) {
                const expression = '`{...searchParams}`, `Object.keys(searchParams)`, or similar';
                (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(store.route, expression);
            }
            return Reflect.ownKeys(target);
        }
    });
    // We don't use makeResolvedReactPromise here because searchParams
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = new Promise((resolve)=>(0, _scheduler.scheduleImmediate)(()=>resolve(underlyingSearchParams)));
    promise.then(()=>{
        promiseInitialized = true;
    });
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
            // These properties cannot be shadowed because they need to be the
            // true underlying value for Promises to work correctly at runtime
            unproxiedProperties.push(prop);
        } else {
            proxiedProperties.add(prop);
            Object.defineProperty(promise, prop, {
                get () {
                    return proxiedUnderlying[prop];
                },
                set (newValue) {
                    Object.defineProperty(promise, prop, {
                        value: newValue,
                        writable: true,
                        enumerable: true
                    });
                },
                enumerable: true,
                configurable: true
            });
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (prop === 'then' && store.dynamicShouldError) {
                const expression = '`searchParams.then`';
                (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(store.route, expression);
            }
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                    syncIODev(store.route, expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                    syncIODev(store.route, expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            const expression = '`Object.keys(searchParams)` or similar';
            syncIODev(store.route, expression, unproxiedProperties);
            return Reflect.ownKeys(target);
        }
    });
    CachedSearchParams.set(underlyingSearchParams, proxiedPromise);
    return proxiedPromise;
}
function syncIODev(route, expression, missingProperties) {
    // In all cases we warn normally
    if (missingProperties && missingProperties.length > 0) {
        warnForIncompleteEnumeration(route, expression, missingProperties);
    } else {
        warnForSyncAccess(route, expression);
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(requestStore);
    }
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createSearchAccessError);
const warnForIncompleteEnumeration = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createIncompleteEnumerationError);
function createSearchAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`searchParams\` should be awaited before using its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E249",
        enumerable: false,
        configurable: true
    });
}
function createIncompleteEnumerationError(route, expression, missingProperties) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`searchParams\` should be awaited before using its properties. ` + `The following properties were not available through enumeration ` + `because they conflict with builtin or well-known property names: ` + `${describeListOfPropertyNames(missingProperties)}. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E2",
        enumerable: false,
        configurable: true
    });
}
function describeListOfPropertyNames(properties) {
    switch(properties.length){
        case 0:
            throw Object.defineProperty(new _invarianterror.InvariantError('Expected describeListOfPropertyNames to be called with a non-empty list of strings.'), "__NEXT_ERROR_CODE", {
                value: "E531",
                enumerable: false,
                configurable: true
            });
        case 1:
            return `\`${properties[0]}\``;
        case 2:
            return `\`${properties[0]}\` and \`${properties[1]}\``;
        default:
            {
                let description = '';
                for(let i = 0; i < properties.length - 1; i++){
                    description += `\`${properties[i]}\`, `;
                }
                description += `, and \`${properties[properties.length - 1]}\``;
                return description;
            }
    }
} //# sourceMappingURL=search-params.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/params.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$13_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createParamsFromClient: null,
    createPrerenderParamsForClientSegment: null,
    createServerParamsForMetadata: null,
    createServerParamsForRoute: null,
    createServerParamsForServerSegment: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createParamsFromClient: function() {
        return createParamsFromClient;
    },
    createPrerenderParamsForClientSegment: function() {
        return createPrerenderParamsForClientSegment;
    },
    createServerParamsForMetadata: function() {
        return createServerParamsForMetadata;
    },
    createServerParamsForRoute: function() {
        return createServerParamsForRoute;
    },
    createServerParamsForServerSegment: function() {
        return createServerParamsForServerSegment;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/dynamic-rendering-utils.js [app-client] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-client] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/lib/scheduler.js [app-client] (ecmascript)");
function createParamsFromClient(underlyingParams, workStore) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createPrerenderParams(underlyingParams, workStore, workUnitStore);
            default:
        }
    }
    return createRenderParams(underlyingParams, workStore);
}
const createServerParamsForMetadata = createServerParamsForServerSegment;
function createServerParamsForRoute(underlyingParams, workStore) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createPrerenderParams(underlyingParams, workStore, workUnitStore);
            default:
        }
    }
    return createRenderParams(underlyingParams, workStore);
}
function createServerParamsForServerSegment(underlyingParams, workStore) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createPrerenderParams(underlyingParams, workStore, workUnitStore);
            default:
        }
    }
    return createRenderParams(underlyingParams, workStore);
}
function createPrerenderParamsForClientSegment(underlyingParams, workStore) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (prerenderStore && prerenderStore.type === 'prerender') {
        const fallbackParams = workStore.fallbackRouteParams;
        if (fallbackParams) {
            for(let key in underlyingParams){
                if (fallbackParams.has(key)) {
                    // This params object has one of more fallback params so we need to consider
                    // the awaiting of this params object "dynamic". Since we are in dynamicIO mode
                    // we encode this as a promise that never resolves
                    return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`params`');
                }
            }
        }
    }
    // We're prerendering in a mode that does not abort. We resolve the promise without
    // any tracking because we're just transporting a value from server to client where the tracking
    // will be applied.
    return Promise.resolve(underlyingParams);
}
function createPrerenderParams(underlyingParams, workStore, prerenderStore) {
    const fallbackParams = workStore.fallbackRouteParams;
    if (fallbackParams) {
        let hasSomeFallbackParams = false;
        for(const key in underlyingParams){
            if (fallbackParams.has(key)) {
                hasSomeFallbackParams = true;
                break;
            }
        }
        if (hasSomeFallbackParams) {
            // params need to be treated as dynamic because we have at least one fallback param
            if (prerenderStore.type === 'prerender') {
                // We are in a dynamicIO (PPR or otherwise) prerender
                return makeAbortingExoticParams(underlyingParams, workStore.route, prerenderStore);
            }
            // remaining cases are prerender-ppr and prerender-legacy
            // We aren't in a dynamicIO prerender but we do have fallback params at this
            // level so we need to make an erroring exotic params object which will postpone
            // if you access the fallback params
            return makeErroringExoticParams(underlyingParams, fallbackParams, workStore, prerenderStore);
        }
    }
    // We don't have any fallback params so we have an entirely static safe params object
    return makeUntrackedExoticParams(underlyingParams);
}
function createRenderParams(underlyingParams, workStore) {
    if (("TURBOPACK compile-time value", "development") === 'development' && !workStore.isPrefetchRequest) {
        return makeDynamicallyTrackedExoticParamsWithDevWarnings(underlyingParams, workStore);
    } else {
        return makeUntrackedExoticParams(underlyingParams);
    }
}
const CachedParams = new WeakMap();
function makeAbortingExoticParams(underlyingParams, route, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, '`params`');
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            Object.defineProperty(promise, prop, {
                get () {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    const error = createParamsAccessError(route, expression);
                    (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(route, expression, error, prerenderStore);
                },
                set (newValue) {
                    Object.defineProperty(promise, prop, {
                        value: newValue,
                        writable: true,
                        enumerable: true
                    });
                },
                enumerable: true,
                configurable: true
            });
        }
    });
    return promise;
}
function makeErroringExoticParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const augmentedUnderlying = {
        ...underlyingParams
    };
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(augmentedUnderlying);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            if (fallbackParams.has(prop)) {
                Object.defineProperty(augmentedUnderlying, prop, {
                    get () {
                        const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when dynamicIO is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no dynamicIO)
                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                        }
                    },
                    enumerable: true
                });
                Object.defineProperty(promise, prop, {
                    get () {
                        const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when dynamicIO is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no dynamicIO)
                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                        }
                    },
                    set (newValue) {
                        Object.defineProperty(promise, prop, {
                            value: newValue,
                            writable: true,
                            enumerable: true
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
            } else {
                ;
                promise[prop] = underlyingParams[prop];
            }
        }
    });
    return promise;
}
function makeUntrackedExoticParams(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(underlyingParams);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            ;
            promise[prop] = underlyingParams[prop];
        }
    });
    return promise;
}
function makeDynamicallyTrackedExoticParamsWithDevWarnings(underlyingParams, store) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = new Promise((resolve)=>(0, _scheduler.scheduleImmediate)(()=>resolve(underlyingParams)));
    const proxiedProperties = new Set();
    const unproxiedProperties = [];
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
            // These properties cannot be shadowed because they need to be the
            // true underlying value for Promises to work correctly at runtime
            unproxiedProperties.push(prop);
        } else {
            proxiedProperties.add(prop);
            promise[prop] = underlyingParams[prop];
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (proxiedProperties.has(prop)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    syncIODev(store.route, expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys (target) {
            const expression = '`...params` or similar expression';
            syncIODev(store.route, expression, unproxiedProperties);
            return Reflect.ownKeys(target);
        }
    });
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function syncIODev(route, expression, missingProperties) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(requestStore);
    }
    // In all cases we warn normally
    if (missingProperties && missingProperties.length > 0) {
        warnForIncompleteEnumeration(route, expression, missingProperties);
    } else {
        warnForSyncAccess(route, expression);
    }
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createParamsAccessError);
const warnForIncompleteEnumeration = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createIncompleteEnumerationError);
function createParamsAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`params\` should be awaited before using its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E307",
        enumerable: false,
        configurable: true
    });
}
function createIncompleteEnumerationError(route, expression, missingProperties) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`params\` should be awaited before using its properties. ` + `The following properties were not available through enumeration ` + `because they conflict with builtin property names: ` + `${describeListOfPropertyNames(missingProperties)}. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E482",
        enumerable: false,
        configurable: true
    });
}
function describeListOfPropertyNames(properties) {
    switch(properties.length){
        case 0:
            throw Object.defineProperty(new _invarianterror.InvariantError('Expected describeListOfPropertyNames to be called with a non-empty list of strings.'), "__NEXT_ERROR_CODE", {
                value: "E531",
                enumerable: false,
                configurable: true
            });
        case 1:
            return `\`${properties[0]}\``;
        case 2:
            return `\`${properties[0]}\` and \`${properties[1]}\``;
        default:
            {
                let description = '';
                for(let i = 0; i < properties.length - 1; i++){
                    description += `\`${properties[i]}\`, `;
                }
                description += `, and \`${properties[properties.length - 1]}\``;
                return description;
            }
    }
} //# sourceMappingURL=params.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientPageRoot", {
    enumerable: true,
    get: function() {
        return ClientPageRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/jsx-runtime.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
function ClientPageRoot(param) {
    let { Component, searchParams, params, promises } = param;
    if (typeof window === 'undefined') {
        const { workAsyncStorage } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)");
        let clientSearchParams;
        let clientParams;
        // We are going to instrument the searchParams prop with tracking for the
        // appropriate context. We wrap differently in prerendering vs rendering
        const store = workAsyncStorage.getStore();
        if (!store) {
            throw Object.defineProperty(new _invarianterror.InvariantError('Expected workStore to exist when handling searchParams in a client Page.'), "__NEXT_ERROR_CODE", {
                value: "E564",
                enumerable: false,
                configurable: true
            });
        }
        const { createSearchParamsFromClient } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/search-params.js [app-client] (ecmascript)");
        clientSearchParams = createSearchParamsFromClient(searchParams, store);
        const { createParamsFromClient } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/params.js [app-client] (ecmascript)");
        clientParams = createParamsFromClient(params, store);
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
            params: clientParams,
            searchParams: clientSearchParams
        });
    } else {
        const { createRenderSearchParamsFromClient } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)");
        const clientSearchParams = createRenderSearchParamsFromClient(searchParams);
        const { createRenderParamsFromClient } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)");
        const clientParams = createRenderParamsFromClient(params);
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
            params: clientParams,
            searchParams: clientSearchParams
        });
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-page.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/client-segment.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientSegmentRoot", {
    enumerable: true,
    get: function() {
        return ClientSegmentRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/jsx-runtime.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
function ClientSegmentRoot(param) {
    let { Component, slots, params, promise } = param;
    if (typeof window === 'undefined') {
        const { workAsyncStorage } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)");
        let clientParams;
        // We are going to instrument the searchParams prop with tracking for the
        // appropriate context. We wrap differently in prerendering vs rendering
        const store = workAsyncStorage.getStore();
        if (!store) {
            throw Object.defineProperty(new _invarianterror.InvariantError('Expected workStore to exist when handling params in a client segment such as a Layout or Template.'), "__NEXT_ERROR_CODE", {
                value: "E600",
                enumerable: false,
                configurable: true
            });
        }
        const { createParamsFromClient } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/request/params.js [app-client] (ecmascript)");
        clientParams = createParamsFromClient(params, store);
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
            ...slots,
            params: clientParams
        });
    } else {
        const { createRenderParamsFromClient } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)");
        const clientParams = createRenderParamsFromClient(params);
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
            ...slots,
            params: clientParams
        });
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-segment.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/metadata/browser-resolved-metadata.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BrowserResolvedMetadata", {
    enumerable: true,
    get: function() {
        return BrowserResolvedMetadata;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
function BrowserResolvedMetadata(param) {
    let { promise } = param;
    const { metadata, error } = (0, _react.use)(promise);
    // If there's metadata error on client, discard the browser metadata
    // and let metadata outlet deal with the error. This will avoid the duplication metadata.
    if (error) return null;
    return metadata;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=browser-resolved-metadata.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/server-inserted-metadata.shared-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ServerInsertedMetadataContext", {
    enumerable: true,
    get: function() {
        return ServerInsertedMetadataContext;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
const ServerInsertedMetadataContext = (0, _react.createContext)(null); //# sourceMappingURL=server-inserted-metadata.shared-runtime.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/metadata/server-inserted-metadata.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ServerInsertMetadata", {
    enumerable: true,
    get: function() {
        return ServerInsertMetadata;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
const _serverinsertedmetadatasharedruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/shared/lib/server-inserted-metadata.shared-runtime.js [app-client] (ecmascript)");
// Receives a metadata resolver setter from the context, and will pass the metadata resolving promise to
// the context where we gonna use it to resolve the metadata, and render as string to append in <body>.
const useServerInsertedMetadata = (metadataResolver)=>{
    const setMetadataResolver = (0, _react.useContext)(_serverinsertedmetadatasharedruntime.ServerInsertedMetadataContext);
    if (setMetadataResolver) {
        setMetadataResolver(metadataResolver);
    }
};
function ServerInsertMetadata(param) {
    let { promise } = param;
    // Apply use() to the metadata promise to suspend the rendering in SSR.
    const { metadata } = (0, _react.use)(promise);
    // Insert metadata into the HTML stream through the `useServerInsertedMetadata`
    useServerInsertedMetadata({
        "ServerInsertMetadata.useServerInsertedMetadata": ()=>metadata
    }["ServerInsertMetadata.useServerInsertedMetadata"]);
    return null;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-inserted-metadata.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/metadata/async-metadata.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AsyncMetadata: null,
    AsyncMetadataOutlet: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AsyncMetadata: function() {
        return AsyncMetadata;
    },
    AsyncMetadataOutlet: function() {
        return AsyncMetadataOutlet;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/jsx-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
const AsyncMetadata = typeof window === 'undefined' ? __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/metadata/server-inserted-metadata.js [app-client] (ecmascript)").ServerInsertMetadata : __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/metadata/browser-resolved-metadata.js [app-client] (ecmascript)").BrowserResolvedMetadata;
function MetadataOutlet(param) {
    let { promise } = param;
    const { error, digest } = (0, _react.use)(promise);
    if (error) {
        if (digest) {
            // The error will lose its original digest after passing from server layer to client layer；
            // We recover the digest property here to override the React created one if original digest exists.
            ;
            error.digest = digest;
        }
        throw error;
    }
    return null;
}
function AsyncMetadataOutlet(param) {
    let { promise } = param;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
        fallback: null,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(MetadataOutlet, {
            promise: promise
        })
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=async-metadata.js.map
}}),
"[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/metadata/metadata-boundary.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    MetadataBoundary: null,
    OutletBoundary: null,
    ViewportBoundary: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MetadataBoundary: function() {
        return MetadataBoundary;
    },
    OutletBoundary: function() {
        return OutletBoundary;
    },
    ViewportBoundary: function() {
        return ViewportBoundary;
    }
});
const _metadataconstants = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.3.0-canary.13_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/lib/metadata/metadata-constants.js [app-client] (ecmascript)");
// We use a namespace object to allow us to recover the name of the function
// at runtime even when production bundling/minification is used.
const NameSpace = {
    [_metadataconstants.METADATA_BOUNDARY_NAME]: function(param) {
        let { children } = param;
        return children;
    },
    [_metadataconstants.VIEWPORT_BOUNDARY_NAME]: function(param) {
        let { children } = param;
        return children;
    },
    [_metadataconstants.OUTLET_BOUNDARY_NAME]: function(param) {
        let { children } = param;
        return children;
    }
};
const MetadataBoundary = // so it retains the name inferred from the namespace object
NameSpace[_metadataconstants.METADATA_BOUNDARY_NAME.slice(0)];
const ViewportBoundary = // so it retains the name inferred from the namespace object
NameSpace[_metadataconstants.VIEWPORT_BOUNDARY_NAME.slice(0)];
const OutletBoundary = // so it retains the name inferred from the namespace object
NameSpace[_metadataconstants.OUTLET_BOUNDARY_NAME.slice(0)];
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=metadata-boundary.js.map
}}),
}]);

//# sourceMappingURL=2c2f4_next_dist_0d23e5ef._.js.map