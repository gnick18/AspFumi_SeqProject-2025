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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/submit-metadata/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
// --- HELPER FUNCTION TO PREVENT TSV CORRUPTION ---
// This function sanitizes text to ensure it doesn't break the TSV format.
const sanitizeForTsv = (text)=>{
    if (!text) return '';
    // Replace tabs with spaces and remove newline characters
    return text.replace(/\t/g, ' ').replace(/[\r\n]/g, '');
};
// --- DYNAMIC GEOCODING FUNCTION ---
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
                    console.log(`Geocoding success for "${query}":`, result.display_name);
                    // IMPROVEMENT: Use the 'type' field from Nominatim for more reliable match level.
                    let matchLevel = 'country';
                    const type = result.type;
                    if ([
                        'city',
                        'town',
                        'village'
                    ].includes(type)) {
                        matchLevel = 'city';
                    } else if ([
                        'state',
                        'province',
                        'region'
                    ].includes(type)) {
                        matchLevel = 'state';
                    }
                    return {
                        lat: parseFloat(result.lat),
                        lng: parseFloat(result.lon),
                        matchLevel: matchLevel
                    };
                }
            }
        } catch (error) {
            console.error(`Geocoding error for query "${query}":`, error);
        }
    }
    console.log(`Geocoding FAILED for: City="${city}", State="${state}", Country="${country}"`);
    return null;
}
async function POST(request) {
    try {
        const data = await request.json();
        const requiredFields = [
            'labName',
            'institution',
            'city',
            'country',
            'contactName',
            'contactEmail',
            'researchUse'
        ];
        for (const field of requiredFields){
            if (!data[field]) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Missing required field: ${field}`
                }, {
                    status: 400
                });
            }
        }
        const timestamp = new Date().toISOString();
        const coordinates = await getCoordinates(data.city, data.state, data.country);
        // BUG FIX: Use the sanitize function on all user-provided text fields for the TSV.
        const tsvRow = [
            timestamp,
            sanitizeForTsv(data.labName),
            sanitizeForTsv(data.institution),
            sanitizeForTsv(data.city),
            sanitizeForTsv(data.state),
            sanitizeForTsv(data.country),
            sanitizeForTsv(data.contactName),
            sanitizeForTsv(data.contactEmail),
            sanitizeForTsv(data.researchUse),
            sanitizeForTsv(data.comments),
            coordinates?.lat?.toString() || '',
            coordinates?.lng?.toString() || '',
            coordinates?.matchLevel || 'none'
        ].join('\t');
        const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
        const tsvFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'lab_submissions.tsv');
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(dataDir, {
            recursive: true
        });
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].access(tsvFilePath);
        } catch  {
            const headers = [
                'timestamp',
                'lab_name',
                'institution',
                'city',
                'state',
                'country',
                'contact_name',
                'contact_email',
                'research_use',
                'comments',
                'latitude',
                'longitude',
                'match_level'
            ].join('\t');
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(tsvFilePath, headers + '\n');
        }
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].appendFile(tsvFilePath, tsvRow + '\n');
        let successMessage = 'Metadata submitted successfully';
        if (coordinates) {
            const jsonFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'labs.json');
            let labs = [];
            try {
                const jsonData = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(jsonFilePath, 'utf-8');
                labs = JSON.parse(jsonData);
            } catch  {}
            const newLab = {
                id: `lab_${Date.now()}`,
                name: data.labName,
                institution: data.institution,
                location: `${data.city}${data.state ? ', ' + data.state : ''}, ${data.country}`,
                country: data.country,
                lat: coordinates.lat,
                lng: coordinates.lng
            };
            labs.push(newLab);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(jsonFilePath, JSON.stringify(labs, null, 2));
            successMessage += ` Your laboratory will now appear on our global map (matched at ${coordinates.matchLevel} level).`;
        } else {
            successMessage += '. Note: Your location could not be automatically mapped and will be reviewed manually.';
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: successMessage
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4fe8a5c2._.js.map