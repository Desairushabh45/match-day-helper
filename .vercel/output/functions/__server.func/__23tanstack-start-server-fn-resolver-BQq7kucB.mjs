//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BQq7kucB.js
var manifest = { "21cb56a8e3b1399cc3f25c4206790f000fe690b1f1eb0ae2754e5aa55a1c05e0": {
	functionName: "chatWithStadiumIQ_createServerFn_handler",
	importer: () => import("./_ssr/chat.functions-DfYIDeth.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
