module.exports = [
"[project]/.next-internal/server/app/api/admin/isolates/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/admin/isolates/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
// IMPORT THE DATABASE DRIVER
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
;
async function GET() {
    const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
    try {
        const submissions = await sql`SELECT * FROM isolate_submissions ORDER BY timestamp DESC`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            submissions
        });
    } catch (error) {
        console.error("Database GET Error (isolates):", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch isolate data."
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
    try {
        const rawBodyText = await request.text();
        console.log('Received RAW TEXT body:', rawBodyText);
        //
        let body;
        try {
            body = JSON.parse(rawBodyText);
        } catch (parseError) {
            console.error("JSON PARSE FAILED:", parseError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Malformed JSON request body."
            }, {
                status: 400
            } // This 400 is now explicitly reporting a bad JSON format
            );
        }
        // 1. Destructure all fields, providing default empty strings for optional fields
        const { submitting_lab, strain_name, genotype, other_genes, other_mutations = '', strain_origin = '', strain_center_name = '', strain_center_location = '', strain_center_date = '', sharing_lab_name = '', sharing_lab_institute = '', sharing_lab_location = '' } = body;
        // 2. Use the destructured variables for required fields check
        if (!submitting_lab || !strain_name) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields: submitting_lab or strain_name"
            }, {
                status: 400
            });
        }
        const genotypeDetailsJson = JSON.stringify(genotype);
        const otherGenesJson = JSON.stringify(other_genes);
        await sql`
      INSERT INTO isolate_submissions (
        submitting_lab, strain_name, strain_origin,
        strain_center_name, strain_center_location, strain_center_date,
        sharing_lab_name, sharing_lab_institute, sharing_lab_location,
        genotype_details_json, other_genes_json, other_mutations
      ) VALUES (
        ${submitting_lab}, ${strain_name}, ${strain_origin},
        ${strain_center_name}, ${strain_center_location}, ${strain_center_date},
        ${sharing_lab_name}, ${sharing_lab_institute}, ${sharing_lab_location},
        ${genotypeDetailsJson},
        ${otherGenesJson},
        ${other_mutations}
      );
    `;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Isolate information submitted successfully!"
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Database POST Error (isolates):", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to submit isolate data."
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const updatedRow = await request.json();
        const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
        await sql`
      UPDATE isolate_submissions
      SET
        submitting_lab = ${updatedRow.submitting_lab},
        strain_name = ${updatedRow.strain_name},
        strain_origin = ${updatedRow.strain_origin},
        strain_center_name = ${updatedRow.strain_center_name},
        strain_center_location = ${updatedRow.strain_center_location},
        strain_center_date = ${updatedRow.strain_center_date},
        sharing_lab_name = ${updatedRow.sharing_lab_name},
        sharing_lab_institute = ${updatedRow.sharing_lab_institute},
        sharing_lab_location = ${updatedRow.sharing_lab_location},
        genotype_details_json = ${updatedRow.genotype_details_json},
        other_genes_json = ${updatedRow.other_genes_json},
        other_mutations = ${updatedRow.other_mutations}
      WHERE id = ${updatedRow.id};
    `;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            updatedRow: updatedRow
        });
    } catch (error) {
        console.error("Database PUT Error (isolates):", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update isolate data."
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { id } = await request.json();
        const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
        await sql`DELETE FROM isolate_submissions WHERE id = ${id}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("Database DELETE Error (isolates):", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to delete isolate data."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ed6d78c5._.js.map