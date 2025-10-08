(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/isolate-form/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IsolateForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const CORRECT_PASSWORD = 'fumi';
function IsolateForm() {
    _s();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordInput, setPasswordInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordError, setPasswordError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitMessage, setSubmitMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [labNames, setLabNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingLabs, setLoadingLabs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        submittingLab: '',
        strainName: '',
        genotype: {
            ku: {
                present: '',
                complemented: '',
                kuType: '',
                method: '',
                markerGene: '',
                chemicalName: '',
                otherMethod: '',
                mutationDate: ''
            },
            pyrG: {
                present: '',
                complemented: '',
                method: '',
                markerGene: '',
                chemicalName: '',
                otherMethod: '',
                mutationDate: ''
            },
            argB: {
                present: '',
                complemented: '',
                method: '',
                markerGene: '',
                chemicalName: '',
                otherMethod: '',
                mutationDate: ''
            }
        },
        otherGenes: [],
        otherMutations: '',
        strainOrigin: '',
        strainCenterName: '',
        strainCenterLocation: '',
        strainCenterDate: '',
        sharingLabName: '',
        sharingLabInstitute: '',
        sharingLabLocation: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IsolateForm.useEffect": ()=>{
            const fetchLabNames = {
                "IsolateForm.useEffect.fetchLabNames": async ()=>{
                    try {
                        setLoadingLabs(true);
                        const response = await fetch('/api/labs');
                        if (response.ok) {
                            const data = await response.json();
                            if (data.success && Array.isArray(data.labs)) {
                                const validNames = data.labs.map({
                                    "IsolateForm.useEffect.fetchLabNames.validNames": (lab)=>lab.name
                                }["IsolateForm.useEffect.fetchLabNames.validNames"]).filter({
                                    "IsolateForm.useEffect.fetchLabNames.validNames": (name)=>typeof name === 'string' && name.length > 0
                                }["IsolateForm.useEffect.fetchLabNames.validNames"]);
                                const uniqueNames = [
                                    ...new Set(validNames)
                                ];
                                // FIX: The missing piece was here. We need to update the state with the fetched names.
                                setLabNames(uniqueNames.sort({
                                    "IsolateForm.useEffect.fetchLabNames": (a, b)=>a.localeCompare(b)
                                }["IsolateForm.useEffect.fetchLabNames"]));
                            }
                        }
                    } catch (error) {
                        console.error("Failed to fetch lab names:", error);
                    } finally{
                        setLoadingLabs(false);
                    }
                }
            }["IsolateForm.useEffect.fetchLabNames"];
            if (isAuthenticated) {
                fetchLabNames();
            }
        }
    }["IsolateForm.useEffect"], [
        isAuthenticated
    ]);
    const handlePasswordSubmit = (e)=>{
        e.preventDefault();
        if (passwordInput === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('Incorrect password. Please contact the organizing team for the correct password.');
        }
    };
    const handleFormChange = (field, value)=>{
        setFormData((prev)=>{
            const newState = JSON.parse(JSON.stringify(prev));
            if (field.startsWith('genotype.')) {
                const [, mutation, key] = field.split('.');
                const mutationState = newState.genotype[mutation];
                mutationState[key] = value;
                if (key === 'present' && value !== 'Yes') {
                    Object.keys(mutationState).forEach((k)=>{
                        if (k !== 'present') mutationState[k] = '';
                    });
                }
                if (key === 'method') {
                    mutationState.markerGene = '';
                    mutationState.chemicalName = '';
                    mutationState.otherMethod = '';
                }
            } else if (field.startsWith('otherGenes.')) {
                const [, indexStr, key] = field.split('.');
                const index = parseInt(indexStr, 10);
                const geneState = newState.otherGenes[index];
                geneState[key] = value;
                if (key === 'method') {
                    geneState.markerGene = '';
                    geneState.chemicalName = '';
                    geneState.otherMethod = '';
                }
            } else {
                newState[field] = value;
            }
            return newState;
        });
    };
    const addOtherGene = ()=>{
        setFormData((prev)=>({
                ...prev,
                otherGenes: [
                    ...prev.otherGenes,
                    {
                        geneName: '',
                        present: 'Yes',
                        complemented: '',
                        method: '',
                        markerGene: '',
                        chemicalName: '',
                        otherMethod: '',
                        mutationDate: ''
                    }
                ]
            }));
    };
    const removeOtherGene = (indexToRemove)=>{
        setFormData((prev)=>({
                ...prev,
                otherGenes: prev.otherGenes.filter((_, index)=>index !== indexToRemove)
            }));
    };
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        try {
            const response = await fetch('/api/submit-isolate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const result = await response.json();
                setSubmitMessage(result.message || 'Isolate information submitted successfully!');
                setFormData((prev)=>({
                        ...prev,
                        strainName: '',
                        genotype: {
                            ku: {
                                present: '',
                                complemented: '',
                                kuType: '',
                                method: '',
                                markerGene: '',
                                chemicalName: '',
                                otherMethod: '',
                                mutationDate: ''
                            },
                            pyrG: {
                                present: '',
                                complemented: '',
                                method: '',
                                markerGene: '',
                                chemicalName: '',
                                otherMethod: '',
                                mutationDate: ''
                            },
                            argB: {
                                present: '',
                                complemented: '',
                                method: '',
                                markerGene: '',
                                chemicalName: '',
                                otherMethod: '',
                                mutationDate: ''
                            }
                        },
                        otherGenes: [],
                        otherMutations: '',
                        strainOrigin: '',
                        strainCenterName: '',
                        strainCenterLocation: '',
                        strainCenterDate: '',
                        sharingLabName: '',
                        sharingLabInstitute: '',
                        sharingLabLocation: ''
                    }));
            } else {
                setSubmitMessage('Error submitting form. Please try again.');
            }
        } catch (error) {
            setSubmitMessage('Error submitting form. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    if (!isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl font-bold mb-8",
                    style: {
                        color: 'var(--english-violet)'
                    },
                    children: "Isolate Information Form"
                }, void 0, false, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 211,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/50 p-8 rounded-lg shadow-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4",
                                    style: {
                                        color: 'var(--slate-gray)'
                                    },
                                    children: "Access Required"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 39
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base mb-4",
                                    children: "Please enter the password to access the submission form for isolate information. Each strain you send should have its own submission."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 141
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 213,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handlePasswordSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "password",
                                            className: "block text-sm font-medium mb-2",
                                            children: "Password:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            id: "password",
                                            value: passwordInput,
                                            onChange: (e)=>setPasswordInput(e.target.value),
                                            className: "w-full p-3 border-2 rounded-lg",
                                            style: {
                                                borderColor: 'var(--silver)'
                                            },
                                            placeholder: "Enter your password",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 112
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 21
                                }, this),
                                passwordError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-lg",
                                    style: {
                                        backgroundColor: '#ffebee',
                                        color: '#c62828'
                                    },
                                    children: passwordError
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 40
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full py-3 px-6 rounded-lg font-medium transition-colors",
                                    style: {
                                        backgroundColor: 'var(--citron)',
                                        color: 'var(--english-violet)'
                                    },
                                    children: "Access Form"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 217,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 214,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 212,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/isolate-form/page.tsx",
            lineNumber: 210,
            columnNumber: 9
        }, this);
    }
    const MutationRow = (param)=>{
        let { mutationName, mutationKey, isKu = false } = param;
        const data = formData.genotype[mutationKey];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid md:grid-cols-3 gap-4 items-start py-2 border-b",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "font-medium text-sm pt-2",
                    children: [
                        mutationName,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 227,
                            columnNumber: 136
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-normal text-xs text-gray-500",
                            children: "(say Yes even if it was complemented back in)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 227,
                            columnNumber: 141
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 227,
                    columnNumber: 78
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:col-span-2 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: data.present,
                            onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".present"), e.target.value),
                            className: "w-full p-2 border-2 rounded-lg",
                            style: {
                                borderColor: 'var(--silver)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 227,
                                    columnNumber: 493
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Yes",
                                    children: "Yes"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 227,
                                    columnNumber: 528
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "No",
                                    children: "No"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 227,
                                    columnNumber: 560
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 227,
                            columnNumber: 294
                        }, this),
                        data.present === 'Yes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 pl-4 border-l-2",
                            children: [
                                isKu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm italic",
                                            children: "Type:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 89
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: data.kuType,
                                            onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".kuType"), e.target.value),
                                            className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                            style: {
                                                borderColor: 'var(--silver)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select Ku Type..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 344
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "ku70",
                                                    children: "ku70"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 387
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "ku80",
                                                    children: "ku80"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 421
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 136
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 229,
                                    columnNumber: 36
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm italic",
                                            children: "Complemented?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 78
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: data.complemented,
                                            onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".complemented"), e.target.value),
                                            className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                            style: {
                                                borderColor: 'var(--silver)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 353
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Yes",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 388
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "No",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 420
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 133
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-4 items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm italic pt-2",
                                            children: "Method:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 77
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-2 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: data.method,
                                                    onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".method"), e.target.value),
                                                    className: "w-full p-2 border-2 rounded-lg",
                                                    style: {
                                                        borderColor: 'var(--silver)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select Method..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 366
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Homologous Recombination",
                                                            children: "Homologous Recombination"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 408
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "UV Mutagenesis",
                                                            children: "UV Mutagenesis"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 482
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Chemical Mutagenesis",
                                                            children: "Chemical Mutagenesis"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 536
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "CRISPR",
                                                            children: "CRISPR"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 602
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Other",
                                                            children: "Other (Please specify)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 640
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Unknown",
                                                            children: "Unknown"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 693
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 169
                                                }, this),
                                                data.method === 'Homologous Recombination' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: data.markerGene,
                                                    onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".markerGene"), e.target.value),
                                                    className: "w-full p-2 border-2 rounded-lg",
                                                    placeholder: "Specify marker gene"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 80
                                                }, this),
                                                data.method === 'Chemical Mutagenesis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: data.chemicalName,
                                                    onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".chemicalName"), e.target.value),
                                                    className: "w-full p-2 border-2 rounded-lg",
                                                    placeholder: "Specify chemical"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 76
                                                }, this),
                                                data.method === 'Other' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: data.otherMethod,
                                                    onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".otherMethod"), e.target.value),
                                                    className: "w-full p-2 border-2 rounded-lg",
                                                    placeholder: "Specify other method"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 61
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 131
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm italic",
                                            children: "Mutation Date (Optional):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 79
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: data.mutationDate,
                                            onChange: (e)=>handleFormChange("genotype.".concat(mutationKey, ".mutationDate"), e.target.value),
                                            className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                            style: {
                                                borderColor: 'var(--silver)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 146
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 228,
                            columnNumber: 45
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 227,
                    columnNumber: 253
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/isolate-form/page.tsx",
            lineNumber: 227,
            columnNumber: 9
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold mb-8",
                style: {
                    color: 'var(--english-violet)'
                },
                children: "Isolate Information Submission"
            }, void 0, false, {
                fileName: "[project]/src/app/isolate-form/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/50 p-6 rounded-lg shadow-md mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-base mb-4",
                        children: [
                            "Please fill out this form for ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "each individual isolate"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 245,
                                columnNumber: 126
                            }, this),
                            " you are sending. After submitting, the form will clear."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 245,
                        columnNumber: 66
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: 'var(--slate-gray)'
                        },
                        children: "All fields marked with * are required."
                    }, void 0, false, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 245,
                        columnNumber: 226
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/isolate-form/page.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleFormSubmit,
                className: "space-y-6 bg-white/50 p-8 rounded-lg shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "submittingLab",
                                className: "block text-sm font-medium mb-2",
                                children: "Submitting Laboratory Name *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "submittingLab",
                                value: formData.submittingLab,
                                onChange: (e)=>handleFormChange('submittingLab', e.target.value),
                                className: "w-full p-3 border-2 rounded-lg",
                                style: {
                                    borderColor: 'var(--silver)'
                                },
                                required: true,
                                disabled: loadingLabs,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: loadingLabs ? 'Loading labs...' : 'Select your laboratory'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    labNames.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: name,
                                            children: name
                                        }, name, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "strainName",
                                className: "block text-sm font-medium mb-2",
                                children: "Strain Name/ID *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "strainName",
                                value: formData.strainName,
                                onChange: (e)=>handleFormChange('strainName', e.target.value),
                                className: "w-full p-3 border-2 rounded-lg",
                                style: {
                                    borderColor: 'var(--silver)'
                                },
                                placeholder: "e.g., Af293-Parental, Clinical Isolate X",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 p-4 border-2 rounded-lg",
                        style: {
                            borderColor: 'var(--silver)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-2",
                                style: {
                                    color: 'var(--slate-gray)'
                                },
                                children: "Genotype Information"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MutationRow, {
                                mutationName: "Δku Mutation?",
                                mutationKey: "ku",
                                isKu: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MutationRow, {
                                mutationName: "ΔpyrG Mutation?",
                                mutationKey: "pyrG"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MutationRow, {
                                mutationName: "ΔargB Mutation?",
                                mutationKey: "argB"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 p-4 border-2 rounded-lg",
                        style: {
                            borderColor: 'var(--silver)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold bg-gray-700 text-white p-2 rounded-md",
                                children: "Add Additional Gene Mutation Information"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            formData.otherGenes.map((gene, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 border rounded-md bg-gray-50 relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeOtherGene(index),
                                            className: "absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold",
                                            children: "X"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 283,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-4 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "font-medium text-sm",
                                                    children: "Gene Name:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 77
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: gene.geneName,
                                                    onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".geneName"), e.target.value),
                                                    className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                                    placeholder: "e.g., ΔabcA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 134
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 284,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-4 items-start pt-2 mt-2 border-t",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "font-medium text-sm pt-2",
                                                    children: [
                                                        "Details for ",
                                                        gene.geneName || 'this gene',
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 96
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "md:col-span-2 space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-3 gap-4 items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-sm italic",
                                                                    children: "Complemented?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 83
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: gene.complemented,
                                                                    onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".complemented"), e.target.value),
                                                                    className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                                                    style: {
                                                                        borderColor: 'var(--silver)'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "Select..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 286,
                                                                            columnNumber: 354
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Yes",
                                                                            children: "Yes"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 286,
                                                                            columnNumber: 389
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "No",
                                                                            children: "No"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 286,
                                                                            columnNumber: 421
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 138
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 30
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-3 gap-4 items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-sm italic pt-2",
                                                                    children: "Method:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 81
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "col-span-2 space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            value: gene.method,
                                                                            onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".method"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            style: {
                                                                                borderColor: 'var(--silver)'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "",
                                                                                    children: "Select Method..."
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 366
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Homologous Recombination",
                                                                                    children: "Homologous Recombination"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 408
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "UV Mutagenesis",
                                                                                    children: "UV Mutagenesis"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 482
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Chemical Mutagenesis",
                                                                                    children: "Chemical Mutagenesis"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 536
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "CRISPR",
                                                                                    children: "CRISPR"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 602
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Other",
                                                                                    children: "Other (Please specify)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 640
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Unknown",
                                                                                    children: "Unknown"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 693
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 287,
                                                                            columnNumber: 173
                                                                        }, this),
                                                                        gene.method === 'Homologous Recombination' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: gene.markerGene,
                                                                            onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".markerGene"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            placeholder: "Specify marker gene"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 288,
                                                                            columnNumber: 84
                                                                        }, this),
                                                                        gene.method === 'Chemical Mutagenesis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: gene.chemicalName,
                                                                            onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".chemicalName"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            placeholder: "Specify chemical"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 289,
                                                                            columnNumber: 80
                                                                        }, this),
                                                                        gene.method === 'Other' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: gene.otherMethod,
                                                                            onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".otherMethod"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            placeholder: "Specify other method"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 290,
                                                                            columnNumber: 65
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 135
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-3 gap-4 items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-sm italic",
                                                                    children: "Mutation Date (Optional):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 292,
                                                                    columnNumber: 82
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "date",
                                                                    value: gene.mutationDate,
                                                                    onChange: (e)=>handleFormChange("otherGenes.".concat(index, ".mutationDate"), e.target.value),
                                                                    className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                                                    style: {
                                                                        borderColor: 'var(--silver)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 292,
                                                                    columnNumber: 149
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 191
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 22
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addOtherGene,
                                className: "mt-2 text-sm font-medium text-blue-600 hover:text-blue-800",
                                children: "+ Add Another Gene"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 p-4 border-2 rounded-lg",
                        style: {
                            borderColor: 'var(--silver)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold mb-2",
                                style: {
                                    color: 'var(--slate-gray)'
                                },
                                children: "Strain Origin"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: formData.strainOrigin,
                                onChange: (e)=>handleFormChange('strainOrigin', e.target.value),
                                className: "w-full p-2 border-2 rounded-lg",
                                style: {
                                    borderColor: 'var(--silver)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select origin..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 202
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Strain Center",
                                        children: "From a Strain Center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 244
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Shared by Lab",
                                        children: "Shared by Another Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 303
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "In-house",
                                        children: "Generated In-house"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 363
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            formData.strainOrigin === 'Strain Center' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.strainCenterName,
                                        onChange: (e)=>handleFormChange('strainCenterName', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Name of Center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 131
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.strainCenterLocation,
                                        onChange: (e)=>handleFormChange('strainCenterLocation', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Location of Center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 317
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: formData.strainCenterDate,
                                        onChange: (e)=>handleFormChange('strainCenterDate', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Date Sent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 515
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 302,
                                columnNumber: 60
                            }, this),
                            formData.strainOrigin === 'Shared by Lab' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.sharingLabName,
                                        onChange: (e)=>handleFormChange('sharingLabName', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Name of Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 131
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.sharingLabInstitute,
                                        onChange: (e)=>handleFormChange('sharingLabInstitute', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Institute of Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 310
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.sharingLabLocation,
                                        onChange: (e)=>handleFormChange('sharingLabLocation', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Location of Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 504
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 303,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "otherMutations",
                                className: "block text-sm font-medium mb-2",
                                children: "Other General Genotype Info"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 306,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                id: "otherMutations",
                                value: formData.otherMutations,
                                onChange: (e)=>handleFormChange('otherMutations', e.target.value),
                                rows: 3,
                                className: "w-full p-3 border-2 rounded-lg",
                                style: {
                                    borderColor: 'var(--silver)'
                                },
                                placeholder: "e.g., Reporter::GFP, general strain background notes, etc."
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 306,
                                columnNumber: 124
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    submitMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-lg text-center ".concat(submitMessage.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'),
                        children: submitMessage
                    }, void 0, false, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 307,
                        columnNumber: 28
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isSubmitting,
                            className: "px-8 py-3 rounded-lg font-medium btn-primary disabled:opacity-50",
                            children: isSubmitting ? 'Submitting...' : 'Submit Isolate'
                        }, void 0, false, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 308,
                            columnNumber: 43
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/isolate-form/page.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/isolate-form/page.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
_s(IsolateForm, "M4TbNml2IO4h78TKbzTnFhpOd3Q=");
_c = IsolateForm;
var _c;
__turbopack_context__.k.register(_c, "IsolateForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_isolate-form_page_tsx_f5d4c2dd._.js.map