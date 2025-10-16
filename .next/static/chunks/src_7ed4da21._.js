(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/EditableTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const EditableRow = (param)=>{
    let { row, columns, onSave, onDelete } = param;
    _s();
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rowData, setRowData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(row);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSave = async ()=>{
        setIsSaving(true);
        const success = await onSave(rowData);
        if (success) {
            setIsEditing(false);
        }
        setIsSaving(false);
    };
    const handleChange = (key, value)=>{
        setRowData({
            ...rowData,
            [key]: value
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-b hover:bg-gray-50",
        children: [
            columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-2 text-sm align-top",
                    children: isEditing ? // FIX 2: Added new logic to render a <select> dropdown if 'selectOptions' are provided.
                    col.selectOptions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: rowData[col.key],
                        onChange: (e)=>handleChange(col.key, e.target.value),
                        className: "w-full p-1 border rounded text-xs",
                        children: col.selectOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/src/components/EditableTable.tsx",
                                lineNumber: 53,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditableTable.tsx",
                        lineNumber: 47,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : col.type === 'textarea' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: rowData[col.key],
                        onChange: (e)=>handleChange(col.key, e.target.value),
                        className: "w-full p-1 border rounded text-xs",
                        rows: 4
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditableTable.tsx",
                        lineNumber: 57,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: rowData[col.key],
                        onChange: (e)=>handleChange(col.key, e.target.value),
                        className: "w-full p-1 border rounded"
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditableTable.tsx",
                        lineNumber: 64,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "line-clamp-2",
                        children: rowData[col.key]
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditableTable.tsx",
                        lineNumber: 72,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, col.key, false, {
                    fileName: "[project]/src/components/EditableTable.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "p-2 text-right align-top",
                children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            disabled: isSaving,
                            className: "text-sm text-green-600 hover:text-green-800 font-semibold disabled:opacity-50",
                            children: isSaving ? 'Saving...' : 'Save'
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditableTable.tsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsEditing(false),
                            className: "ml-2 text-sm text-gray-500 hover:text-gray-700",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditableTable.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsEditing(true),
                            className: "text-sm text-blue-600 hover:text-blue-800 font-semibold",
                            children: "Edit"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditableTable.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onDelete(row.id),
                            className: "ml-2 text-sm text-red-600 hover:text-red-800",
                            children: "Delete"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditableTable.tsx",
                            lineNumber: 91,
                            columnNumber: 14
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/EditableTable.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EditableTable.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(EditableRow, "PktLOAb18fm3cjeFgatbPnhUsnQ=");
_c = EditableRow;
const EditableTable = (param)=>{
    let { columns, data, onSave, onDelete } = param;
    if (!data || data.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-gray-500",
            children: "No data available for this category."
        }, void 0, false, {
            fileName: "[project]/src/components/EditableTable.tsx",
            lineNumber: 103,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto bg-white rounded-lg shadow",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-gray-100 text-left",
                        children: [
                            columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "p-2 font-semibold text-sm",
                                    children: col.header
                                }, col.key, false, {
                                    fileName: "[project]/src/components/EditableTable.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditableTable.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EditableTable.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/EditableTable.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: data.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableRow, {
                            row: row,
                            columns: columns,
                            onSave: onSave,
                            onDelete: onDelete
                        }, row.id, false, {
                            fileName: "[project]/src/components/EditableTable.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/EditableTable.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/EditableTable.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/EditableTable.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = EditableTable;
const __TURBOPACK__default__export__ = EditableTable;
var _c, _c1;
__turbopack_context__.k.register(_c, "EditableRow");
__turbopack_context__.k.register(_c1, "EditableTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// FIX: Changed from path alias to a direct relative path
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditableTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EditableTable.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const CORRECT_PASSWORD = 'toxins';
function AdminPage() {
    _s();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordInput, setPasswordInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordError, setPasswordError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [labSubmissions, setLabSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isolateSubmissions, setIsolateSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [contactLog, setContactLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('metadata');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPage.useEffect": ()=>{
            setIsClient(true);
        }
    }["AdminPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPage.useEffect": ()=>{
            if (!isAuthenticated) return;
            const loadAllData = {
                "AdminPage.useEffect.loadAllData": async ()=>{
                    try {
                        setLoading(true);
                        setError(null);
                        const [labRes, isolateRes, contactRes] = await Promise.all([
                            fetch('/api/admin/metadata'),
                            fetch('/api/admin/isolates'),
                            fetch('/api/admin/contact-log')
                        ]);
                        if (!labRes.ok || !isolateRes.ok || !contactRes.ok) {
                            throw new Error('Failed to fetch one or more data sources.');
                        }
                        const labData = await labRes.json();
                        const isolateData = await isolateRes.json();
                        const contactData = await contactRes.json();
                        setLabSubmissions(labData.submissions || []);
                        setIsolateSubmissions(isolateData.submissions || []);
                        setContactLog(contactData.contacts || []);
                    } catch (err) {
                        console.error(err);
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError('An unknown error occurred while loading data.');
                        }
                    } finally{
                        setLoading(false);
                    }
                }
            }["AdminPage.useEffect.loadAllData"];
            loadAllData();
        }
    }["AdminPage.useEffect"], [
        isAuthenticated
    ]);
    const handlePasswordSubmit = (e)=>{
        e.preventDefault();
        if (passwordInput === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('Incorrect password.');
        }
    };
    const handleSave = async (updatedRow, endpoint)=>{
        try {
            const response = await fetch("/api/admin/".concat(endpoint), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRow)
            });
            if (!response.ok) throw new Error('Failed to save data.');
            if (endpoint === 'metadata') {
                setLabSubmissions((labs)=>labs.map((lab)=>lab.id === updatedRow.id ? updatedRow : lab));
            } else {
                setIsolateSubmissions((isos)=>isos.map((iso)=>iso.id === updatedRow.id ? updatedRow : iso));
            }
            return true;
        } catch (saveError) {
            console.error('Save failed:', saveError);
            alert('Error saving data. Please check the console.');
            return false;
        }
    };
    const handleDelete = async (id, endpoint)=>{
        if (!confirm('Are you sure you want to delete this row? This action cannot be undone.')) return;
        try {
            const response = await fetch("/api/admin/".concat(endpoint), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            if (!response.ok) throw new Error('Failed to delete data.');
            if (endpoint === 'metadata') {
                setLabSubmissions((labs)=>labs.filter((lab)=>lab.id !== id));
            } else {
                setIsolateSubmissions((isolates)=>isolates.filter((iso)=>iso.id !== id));
            }
        } catch (deleteError) {
            console.error('Delete failed:', deleteError);
            alert('Error deleting data. Please check the console.');
        }
    };
    const handleSaveContact = async (updatedRow)=>{
        try {
            const response = await fetch('/api/admin/contact-log', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRow)
            });
            if (!response.ok) throw new Error('Failed to save contact.');
            setContactLog((contacts)=>contacts.map((c)=>c.id === updatedRow.id ? updatedRow : c));
            return true;
        } catch (e) {
            console.error(e);
            alert('Failed to save contact.');
            return false;
        }
    };
    const handleDeleteContact = async (id)=>{
        if (!confirm('Are you sure you want to delete this contact log entry?')) return;
        try {
            await fetch('/api/admin/contact-log', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            setContactLog((contacts)=>contacts.filter((c)=>c.id !== id));
        } catch (e) {
            console.error(e);
            alert('Failed to delete contact.');
        }
    };
    const handleAddNewContact = async ()=>{
        try {
            const response = await fetch('/api/admin/contact-log', {
                method: 'POST'
            });
            const { newEntry } = await response.json();
            if (newEntry) {
                setContactLog((currentContacts)=>[
                        ...currentContacts,
                        newEntry
                    ]);
            }
        } catch (e) {
            console.error(e);
            alert('Failed to add new row.');
        }
    };
    const labColumns = [
        {
            key: 'lab_name',
            header: 'Lab Name'
        },
        {
            key: 'institution',
            header: 'Institution'
        },
        {
            key: 'city',
            header: 'City'
        },
        {
            key: 'state',
            header: 'State/Region'
        },
        {
            key: 'country',
            header: 'Country'
        },
        {
            key: 'contact_email',
            header: 'Contact'
        },
        {
            key: 'latitude',
            header: 'Lat'
        },
        {
            key: 'longitude',
            header: 'Lng'
        },
        {
            key: 'match_level',
            header: 'Match'
        }
    ];
    const isolateColumns = [
        {
            key: 'submitting_lab',
            header: 'Submitting Lab'
        },
        {
            key: 'strain_name',
            header: 'Strain Name'
        },
        {
            key: 'strain_origin',
            header: 'Origin'
        },
        {
            key: 'strain_center_name',
            header: 'Strain Center'
        },
        {
            key: 'strain_center_location',
            header: 'Center Location'
        },
        {
            key: 'sharing_lab_name',
            header: 'Sharing Lab'
        },
        {
            key: 'genotype_details_json',
            header: 'Genotype (JSON)',
            type: 'textarea'
        },
        {
            key: 'other_genes_json',
            header: 'Other Genes (JSON)',
            type: 'textarea'
        },
        {
            key: 'other_mutations',
            header: 'Other Mutations',
            type: 'textarea'
        }
    ];
    const contactColumns = [
        {
            key: 'labName',
            header: 'Lab Name'
        },
        {
            key: 'institution',
            header: 'Institution'
        },
        {
            key: 'email',
            header: 'Email'
        },
        {
            key: 'status',
            header: 'Contacted?',
            selectOptions: [
                "Not contacted",
                "Contacted (x1)",
                "Contacted (x2)",
                "Responded (yes)",
                "Responded (no)"
            ]
        },
        {
            key: 'contactedBy',
            header: 'Contacted By'
        },
        {
            key: 'comments',
            header: "Comments",
            type: 'textarea'
        }
    ];
    if (!isClient) {
        return null;
    }
    if (!isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen bg-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-center text-gray-800",
                        children: "Admin Access"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handlePasswordSubmit,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "password",
                                        className: "text-sm font-bold text-gray-600 block",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "password",
                                        type: "password",
                                        value: passwordInput,
                                        onChange: (e)=>setPasswordInput(e.target.value),
                                        className: "w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            passwordError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600 text-center",
                                children: passwordError
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 204,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md",
                                    children: "Enter"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/page.tsx",
            lineNumber: 188,
            columnNumber: 7
        }, this);
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Loading Admin Dashboard..."
    }, void 0, false, {
        fileName: "[project]/src/app/admin/page.tsx",
        lineNumber: 217,
        columnNumber: 23
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-red-500",
        children: error
    }, void 0, false, {
        fileName: "[project]/src/app/admin/page.tsx",
        lineNumber: 218,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-4 md:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl md:text-3xl font-bold mb-6",
                children: "Admin Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 p-4 border rounded-lg bg-white shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Lab Outreach Tracker"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddNewContact,
                                className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium",
                                children: "+ Add New Row"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditableTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        columns: contactColumns,
                        data: contactLog,
                        onSave: handleSaveContact,
                        onDelete: handleDeleteContact
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-blue-100 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-3xl font-bold text-blue-800",
                                children: labSubmissions.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 233,
                                columnNumber: 60
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-blue-600",
                                children: "Total Labs Submitted"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 233,
                                columnNumber: 135
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-green-100 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-3xl font-bold text-green-800",
                                children: isolateSubmissions.length
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 234,
                                columnNumber: 61
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-green-600",
                                children: "Total Isolates Submitted"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 234,
                                columnNumber: 141
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-purple-100 rounded-lg shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-3xl font-bold text-purple-800",
                                children: labSubmissions.length > 0 ? (isolateSubmissions.length / labSubmissions.length).toFixed(1) : 0
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 235,
                                columnNumber: 62
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-purple-600",
                                children: "Avg. Isolates per Lab"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 235,
                                columnNumber: 212
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex border-b mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('metadata'),
                        className: "py-2 px-4 ".concat(activeTab === 'metadata' ? 'border-b-2 border-blue-500 font-semibold' : ''),
                        children: [
                            "Lab Metadata (",
                            labSubmissions.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('isolates'),
                        className: "py-2 px-4 ".concat(activeTab === 'isolates' ? 'border-b-2 border-blue-500 font-semibold' : ''),
                        children: [
                            "Isolate Submissions (",
                            isolateSubmissions.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            activeTab === 'metadata' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditableTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                columns: labColumns,
                data: labSubmissions,
                onSave: (row)=>handleSave(row, 'metadata'),
                onDelete: (id)=>handleDelete(id, 'metadata')
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 242,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditableTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                columns: isolateColumns,
                data: isolateSubmissions,
                onSave: (row)=>handleSave(row, 'isolates'),
                onDelete: (id)=>handleDelete(id, 'isolates')
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/page.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
_s(AdminPage, "P/QRUIgISmtSyqsiWUIwQlXqi+o=");
_c = AdminPage;
var _c;
__turbopack_context__.k.register(_c, "AdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7ed4da21._.js.map