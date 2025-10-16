module.exports = [
"[project]/.next-internal/server/app/api/submit-metadata/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/app/api/submit-metadata/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
// IMPORT THE DATABASE DRIVER
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
;
// Geocoding function remains the same as it's still needed
async function getCoordinates(city, state, country) {
    const queries = [
        `${city}, ${state}, ${country}`,
        `${city}, ${country}`,
        `${state}, ${country}`,
        country
    ].filter((q)=>q.trim() !== ',' && q.trim().length > 1);
    for (const query of queries){
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=en&limit=1`;
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Aspergillus Community Sequencing Project'
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    const result = data[0];
                    let matchLevel = 'country';
                    if ([
                        'city',
                        'town',
                        'village'
                    ].includes(result.type)) {
                        matchLevel = 'city';
                    } else if ([
                        'state',
                        'province',
                        'region'
                    ].includes(result.type)) {
                        matchLevel = 'state';
                    }
                    return {
                        lat: parseFloat(result.lat),
                        lng: parseFloat(result.lon),
                        matchLevel
                    };
                }
            }
        } catch (error) {
            console.error(`Geocoding error for query "${query}":`, error);
        }
    }
    return null;
}
async function POST(request) {
    try {
        const data = await request.json();
        // 2. CONNECT TO THE DATABASE
        // The connection string is automatically and securely read from the .env.local file
        // that Vercel created for you. You don't need to change this line.
        const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.POSTGRES_URL);
        // Get coordinates for the location
        const coordinates = await getCoordinates(data.city, data.state, data.country);
        // 3. INSERT DATA INTO THE DATABASE
        // This replaces all the old 'fs.writeFile' logic.
        // It's a parameterized query, which is a secure way to prevent SQL injection attacks.
        await sql`
      INSERT INTO lab_submissions (
        lab_name, institution, city, state, country, 
        contact_name, contact_email, research_use, comments, 
        latitude, longitude, match_level
      ) VALUES (
        ${data.labName}, ${data.institution}, ${data.city}, ${data.state}, ${data.country},
        ${data.contactName}, ${data.contactEmail}, ${data.researchUse}, ${data.comments},
        ${coordinates?.lat || null}, ${coordinates?.lng || null}, ${coordinates?.matchLevel || 'none'}
      );
    `;
        let successMessage = 'Metadata submitted successfully';
        if (coordinates) {
            successMessage += ` Your laboratory will appear on our global map shortly (matched at ${coordinates.matchLevel} level).`;
        } else {
            successMessage += '. Note: Your location could not be automatically mapped and will be reviewed manually.';
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: successMessage
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        // Provide a generic error message to the user for security
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error while processing submission.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d916dbf1._.js.map