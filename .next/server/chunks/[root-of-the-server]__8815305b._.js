module.exports = [
"[project]/.next-internal/server/app/api/admin/metadata/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/app/api/admin/metadata/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
// IMPORT THE DATABASE DRIVER
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
;
// --- NEW: Database-powered seeding function ---
// This function will only run if the database table is empty.
async function seedInitialData(sql) {
    const adminLabs = [
        {
            lab_name: 'Keller Lab',
            institution: 'University of Wisconsin-Madison',
            city: 'Madison',
            state: 'WI',
            country: 'United States',
            contact_name: 'Nancy Keller',
            contact_email: 'npkeller@wisc.com',
            research_use: 'Medical microbiology',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: 43.0731,
            longitude: -89.4012,
            match_level: 'city'
        },
        {
            lab_name: 'Rokas Lab',
            institution: 'Vanderbilt University',
            city: 'Nashville',
            state: 'TN',
            country: 'United States',
            contact_name: 'Antonis Rokas',
            contact_email: 'admin@example.com',
            research_use: 'Fungal evolution and pathogenesis.',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: 36.1627,
            longitude: -86.7816,
            match_level: 'city'
        },
        {
            lab_name: 'Barber Lab',
            institution: 'Friedrich Schiller University Jena',
            city: 'Jena',
            state: '',
            country: 'Germany',
            contact_name: 'Amelia Barber',
            contact_email: 'amelia.barber@uni-jena.de',
            research_use: 'Fungal genetics and pathogenesis.',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: 50.9271,
            longitude: 11.5892,
            match_level: 'city'
        },
        {
            lab_name: 'Gluck-Thaler Lab',
            institution: 'University of Wisconsin-Madison',
            city: 'Madison',
            state: 'WI',
            country: 'United States',
            contact_name: 'Emile Gluck-Thaler',
            contact_email: 'gluckthaler@wisc.edu',
            research_use: 'Plant pathology fungal genomics',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: 43.0731,
            longitude: -89.4012,
            match_level: 'city'
        }
    ];
    // Insert each admin lab into the database table
    for (const lab of adminLabs){
        await sql`
      INSERT INTO lab_submissions (
        lab_name, institution, city, state, country, contact_name, contact_email, 
        research_use, comments, latitude, longitude, match_level
      ) VALUES (
        ${lab.lab_name}, ${lab.institution}, ${lab.city}, ${lab.state}, ${lab.country}, 
        ${lab.contact_name}, ${lab.contact_email}, ${lab.research_use}, ${lab.comments},
        ${lab.latitude}, ${lab.longitude}, ${lab.match_level}
      );
    `;
    }
}
async function GET() {
    const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
    try {
        // Check if the table is empty
        const countResult = await sql`SELECT COUNT(*) FROM lab_submissions`;
        const rowCount = parseInt(countResult[0].count, 10);
        // If it's empty, seed it with the initial admin labs
        if (rowCount === 0) {
            await seedInitialData(sql);
        }
        // Fetch and return all submissions
        const submissions = await sql`SELECT * FROM lab_submissions ORDER BY timestamp DESC`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            submissions
        });
    } catch (error) {
        console.error("Database GET Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch data from database."
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
      UPDATE lab_submissions
      SET 
        lab_name = ${updatedRow.lab_name}, institution = ${updatedRow.institution}, city = ${updatedRow.city},
        state = ${updatedRow.state}, country = ${updatedRow.country}, contact_name = ${updatedRow.contact_name},
        contact_email = ${updatedRow.contact_email}, research_use = ${updatedRow.research_use},
        comments = ${updatedRow.comments}, latitude = ${updatedRow.latitude}, longitude = ${updatedRow.longitude},
        match_level = ${updatedRow.match_level}
      WHERE id = ${updatedRow.id};
    `;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            updatedRow
        });
    } catch (error) {
        console.error("Database PUT Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update data in database."
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { id } = await request.json();
        const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
        await sql`DELETE FROM lab_submissions WHERE id = ${id}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("Database DELETE Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to delete data from database."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8815305b._.js.map