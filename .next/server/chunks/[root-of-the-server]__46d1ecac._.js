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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

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
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$parse$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/csv-parse/lib/sync.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$stringify$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/csv-stringify/lib/sync.js [app-route] (ecmascript)");
;
;
;
;
;
const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
const tsvFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'lab_submissions.tsv');
const jsonFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'labs.json');
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
];
// --- NEW: Function to create the initial data files with admin labs ---
async function seedInitialData() {
    // Define your admin labs here.
    // This data will be used to create the initial files.
    const adminLabs = [
        {
            timestamp: new Date('2025-10-01T10:00:00.000Z').toISOString(),
            lab_name: 'Keller Lab',
            institution: 'University of Wisconsin-Madison',
            city: 'Madison',
            state: 'WI',
            country: 'United States',
            contact_name: 'Nancy Keller',
            contact_email: 'npkeller@wisc.com',
            research_use: 'Medical microbiology',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: '43.0731',
            longitude: '-89.4012',
            match_level: 'city'
        },
        {
            timestamp: new Date('2025-10-01T10:01:00.000Z').toISOString(),
            lab_name: 'Rokas Lab',
            institution: 'Vanderbilt University',
            city: 'Nashville',
            state: 'TN',
            country: 'United States',
            contact_name: 'Antonis Rokas',
            contact_email: 'admin@example.com',
            research_use: 'Fungal evolution and pathogenesis.',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: '36.1627',
            longitude: '-86.7816',
            match_level: 'city'
        },
        {
            timestamp: new Date('2025-10-01T10:02:00.000Z').toISOString(),
            lab_name: 'Barber Lab',
            institution: 'Friedrich Schiller University Jena',
            city: 'Jena',
            state: '',
            country: 'Germany',
            contact_name: 'Amelia Barber',
            contact_email: 'amelia.barber@uni-jena.de',
            research_use: 'Fungal genetics and pathogenesis.',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: '50.9271',
            longitude: '11.5892',
            match_level: 'city'
        },
        {
            timestamp: new Date('2025-10-01T10:00:00.000Z').toISOString(),
            lab_name: 'Gluck-Thaler Lab',
            institution: 'University of Wisconsin-Madison',
            city: 'Madison',
            state: 'WI',
            country: 'United States',
            contact_name: 'Emile Gluck-Thaler',
            contact_email: 'gluckthaler@wisc.edu',
            research_use: 'Plant pathology fungal genomics',
            comments: 'This is a pre-seeded admin lab entry.',
            latitude: '43.0731',
            longitude: '-89.4012',
            match_level: 'city'
        }
    ];
    // 1. Create and write the TSV file
    const tsvString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$stringify$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(adminLabs, {
        header: true,
        columns: headers,
        delimiter: '\t'
    });
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(dataDir, {
        recursive: true
    });
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(tsvFilePath, tsvString);
    // 2. Create and write the JSON file for the map
    const jsonData = adminLabs.map((lab, index)=>({
            id: lab.timestamp || `seeded-${index}`,
            name: lab.lab_name,
            institution: lab.institution,
            location: `${lab.city}${lab.state ? ', ' + lab.state : ''}, ${lab.country}`,
            country: lab.country,
            lat: parseFloat(lab.latitude),
            lng: parseFloat(lab.longitude),
            matchLevel: lab.match_level
        }));
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log('Successfully seeded initial lab data.');
}
async function readTsv() {
    try {
        const fileContent = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(tsvFilePath, 'utf-8');
        const records = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$parse$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(fileContent, {
            delimiter: '\t',
            columns: true,
            skip_empty_lines: true
        });
        return records.map((rec)=>({
                id: rec.timestamp,
                ...rec
            }));
    } catch  {
        return [];
    }
}
async function writeData(data) {
    if (data.length > 0) {
        const dataToWrite = data.map(({ id, ...rest })=>rest);
        const tsvString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$csv$2d$stringify$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"])(dataToWrite, {
            header: true,
            delimiter: '\t',
            columns: headers
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(tsvFilePath, tsvString);
    } else {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].unlink(tsvFilePath).catch(()=>{});
    }
    const jsonData = data.map(({ id, lab_name, institution, city, state, country, latitude, longitude, match_level })=>({
            id,
            name: lab_name,
            institution,
            location: `${city}${state ? ', ' + state : ''}, ${country}`,
            country,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            matchLevel: match_level
        }));
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
}
async function GET() {
    try {
        // Check if the file exists. If it throws an error, the file is not there.
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].access(tsvFilePath);
    } catch  {
        // File doesn't exist, so let's create it with the default admin labs.
        console.log('Data file not found. Seeding initial admin labs...');
        await seedInitialData();
    }
    // Now, read the file (which is guaranteed to exist) and return its content.
    const submissions = await readTsv();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        submissions
    });
}
async function PUT(request) {
    const updatedRow = await request.json();
    let submissions = await readTsv();
    const index = submissions.findIndex((s)=>s.id === updatedRow.id);
    if (index === -1) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Submission not found'
        }, {
            status: 404
        });
    }
    submissions[index] = {
        ...submissions[index],
        ...updatedRow
    };
    await writeData(submissions);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        updatedRow
    });
}
async function DELETE(request) {
    const { id } = await request.json();
    let submissions = await readTsv();
    const filteredSubmissions = submissions.filter((s)=>s.id !== id);
    if (submissions.length === filteredSubmissions.length) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Submission not found'
        }, {
            status: 404
        });
    }
    await writeData(filteredSubmissions);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__46d1ecac._.js.map