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
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        submitting_lab: '',
        strain_name: '',
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
        other_genes: [],
        other_mutations: '',
        strain_origin: '',
        strain_center_name: '',
        strain_center_location: '',
        strain_center_date: '',
        sharing_lab_name: '',
        sharing_lab_institute: '',
        sharing_lab_location: ''
    });
    // --- NEW: State to hold validation errors ---
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    //Adding in the hook
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IsolateForm.useEffect": ()=>{
            setHasMounted(true);
        }
    }["IsolateForm.useEffect"], []); // The empty array [] ensures this runs only once on the client
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
                                // FIX: Changed to Array.from() to preserve the string[] type.
                                const uniqueNames = [
                                    ...new Set(validNames)
                                ];
                                const string_uniqueNames = uniqueNames;
                                setLabNames(string_uniqueNames.sort({
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
        // --- NEW: Clear error when user starts typing ---
        if (errors[field]) {
            setErrors((prev)=>{
                const newErrors = {
                    ...prev
                };
                delete newErrors[field];
                return newErrors;
            });
        }
        setFormData((prev)=>{
            const newState = JSON.parse(JSON.stringify(prev));
            if (field.startsWith('genotype.')) {
                const [, mutation, key] = field.split('.');
                const mutationState = newState.genotype[mutation];
                // Use Record to satisfy the index signature requirement for dynamic keys
                mutationState[key] = value;
            } else if (field.startsWith('other_genes.')) {
                const [, indexStr, key] = field.split('.');
                const index = parseInt(indexStr, 10);
                const geneState = newState.other_genes[index];
                // Use Record here as well
                geneState[key] = value;
            } else {
                // And here for top-level properties
                newState[field] = value;
            }
            return newState;
        });
    };
    const addOtherGene = ()=>{
        setFormData((prev)=>({
                ...prev,
                other_genes: [
                    ...prev.other_genes,
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
                other_genes: prev.other_genes.filter((_, index)=>index !== indexToRemove)
            }));
    };
    // Validation function --
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.submitting_lab) {
            newErrors.submitting_lab = 'Submitting Laboratory Name is required.';
        }
        if (!formData.strain_name.trim()) {
            newErrors.strain_name = 'Strain Name/ID is required.';
        }
        return newErrors;
    };
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setSubmitMessage('');
        // Validate form before submitting ---
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitMessage('Please fill out all required fields marked with *');
            return; // Stop the submission
        }
        setIsSubmitting(true);
        const { genotype, other_genes, ...rest } = formData;
        const payload = {
            ...rest,
            genotype_details_json: JSON.stringify(genotype, null, 2),
            other_genes_json: other_genes.length > 0 ? JSON.stringify(other_genes, null, 2) : "No other reported mutations in isolate"
        };
        try {
            const response = await fetch('/api/submit-isolate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const result = await response.json();
                setSubmitMessage(result.message || 'Isolate information submitted successfully!');
                setFormData((prev)=>({
                        ...prev,
                        submitting_lab: prev.submitting_lab,
                        strain_name: '',
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
                        other_genes: [],
                        other_mutations: '',
                        strain_origin: '',
                        strain_center_name: '',
                        strain_center_location: '',
                        strain_center_date: '',
                        sharing_lab_name: '',
                        sharing_lab_institute: '',
                        sharing_lab_location: ''
                    }));
                setErrors({}); // Clear errors on successful submission
            } else {
                const errorText = await response.text();
                console.error("Server responded with an error:", errorText);
                setSubmitMessage("Error: Failed to submit. The server responded: ".concat(errorText));
            }
        } catch (error) {
            console.error("Fetch failed in handleFormSubmit:", error);
            setSubmitMessage('An error occurred. Please check the developer console for details.');
        } finally{
            setIsSubmitting(false);
        }
    };
    if (!hasMounted) {
        return null;
    }
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
                    lineNumber: 247,
                    columnNumber: 44
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
                                    lineNumber: 247,
                                    columnNumber: 232
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base mb-4",
                                    children: "Please enter the password to access the submission form for isolate information. Each strain you send should have its own submission."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 334
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 247,
                            columnNumber: 210
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
                                            lineNumber: 247,
                                            columnNumber: 572
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
                                            lineNumber: 247,
                                            columnNumber: 658
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 567
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
                                    lineNumber: 247,
                                    columnNumber: 922
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
                                    lineNumber: 247,
                                    columnNumber: 1034
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 247,
                            columnNumber: 507
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 247,
                    columnNumber: 156
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/isolate-form/page.tsx",
            lineNumber: 247,
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
                            lineNumber: 254,
                            columnNumber: 136
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-normal text-xs text-gray-500",
                            children: "(say Yes even if it was complemented back in)"
                        }, void 0, false, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 254,
                            columnNumber: 141
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 254,
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
                                    lineNumber: 254,
                                    columnNumber: 493
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Yes",
                                    children: "Yes"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 528
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "No",
                                    children: "No"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 560
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 254,
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
                                            lineNumber: 256,
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
                                                    lineNumber: 256,
                                                    columnNumber: 344
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "ku70",
                                                    children: "ku70"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 387
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "ku80",
                                                    children: "ku80"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 421
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 256,
                                            columnNumber: 136
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 256,
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
                                            lineNumber: 257,
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
                                                    lineNumber: 257,
                                                    columnNumber: 353
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Yes",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 388
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "No",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 420
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 133
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 257,
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
                                            lineNumber: 258,
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
                                                            lineNumber: 258,
                                                            columnNumber: 366
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Homologous Recombination",
                                                            children: "Homologous Recombination"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 408
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "UV Mutagenesis",
                                                            children: "UV Mutagenesis"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 482
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Chemical Mutagenesis",
                                                            children: "Chemical Mutagenesis"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 536
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "CRISPR",
                                                            children: "CRISPR"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 602
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Other",
                                                            children: "Other (Please specify)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 640
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Unknown",
                                                            children: "Unknown"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 693
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 258,
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
                                                    lineNumber: 259,
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
                                                    lineNumber: 260,
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
                                                    lineNumber: 261,
                                                    columnNumber: 61
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 131
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 258,
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
                                            lineNumber: 263,
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
                                            lineNumber: 263,
                                            columnNumber: 146
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/isolate-form/page.tsx",
                            lineNumber: 255,
                            columnNumber: 45
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/isolate-form/page.tsx",
                    lineNumber: 254,
                    columnNumber: 253
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/isolate-form/page.tsx",
            lineNumber: 254,
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
                lineNumber: 272,
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
                                lineNumber: 273,
                                columnNumber: 126
                            }, this),
                            " you are sending. After submitting, the form will clear."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 273,
                        columnNumber: 66
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: 'var(--slate-gray)'
                        },
                        children: [
                            "Fields marked with ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-500 font-bold",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 273,
                                columnNumber: 307
                            }, this),
                            " are required."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 273,
                        columnNumber: 226
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/isolate-form/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleFormSubmit,
                className: "space-y-6 bg-white/50 p-8 rounded-lg shadow-md",
                noValidate: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "submitting_lab",
                                className: "block text-sm font-medium mb-2",
                                children: [
                                    "Submitting Laboratory Name ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 font-bold",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 113
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "submitting_lab",
                                value: formData.submitting_lab,
                                onChange: (e)=>handleFormChange('submitting_lab', e.target.value),
                                className: "w-full p-3 border-2 rounded-lg ".concat(errors.submitting_lab ? 'border-red-500' : 'border-[var(--silver)]'),
                                required: true,
                                disabled: loadingLabs,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: loadingLabs ? 'Loading labs...' : 'Select your laboratory'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    labNames.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: name,
                                            children: name
                                        }, name, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 280,
                                            columnNumber: 36
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            errors.submitting_lab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-xs mt-1",
                                children: errors.submitting_lab
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 282,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "strain_name",
                                className: "block text-sm font-medium mb-2",
                                children: [
                                    "Strain Name/ID ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 font-bold",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 100
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "strain_name",
                                value: formData.strain_name,
                                onChange: (e)=>handleFormChange('strain_name', e.target.value),
                                className: "w-full p-3 border-2 rounded-lg ".concat(errors.strain_name ? 'border-red-500' : 'border-[var(--silver)]'),
                                placeholder: "e.g., Af293-Parental, Clinical Isolate X",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            errors.strain_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-xs mt-1",
                                children: errors.strain_name
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 288,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 284,
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
                                lineNumber: 290,
                                columnNumber: 101
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MutationRow, {
                                mutationName: "Δku Mutation?",
                                mutationKey: "ku",
                                isKu: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 290,
                                columnNumber: 208
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MutationRow, {
                                mutationName: "ΔpyrG Mutation?",
                                mutationKey: "pyrG"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 290,
                                columnNumber: 274
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MutationRow, {
                                mutationName: "ΔargB Mutation?",
                                mutationKey: "argB"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 290,
                                columnNumber: 339
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 290,
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
                                lineNumber: 291,
                                columnNumber: 101
                            }, this),
                            formData.other_genes.map((gene, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 border rounded-md bg-gray-50 relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeOtherGene(index),
                                            className: "absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold",
                                            children: "X"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 337
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-4 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "font-medium text-sm",
                                                    children: "Gene Name:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 541
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: gene.geneName,
                                                    onChange: (e)=>handleFormChange("other_genes.".concat(index, ".geneName"), e.target.value),
                                                    className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                                    placeholder: "e.g., ΔabcA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 598
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 485
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
                                                    lineNumber: 291,
                                                    columnNumber: 884
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
                                                                    lineNumber: 291,
                                                                    columnNumber: 1073
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: gene.complemented,
                                                                    onChange: (e)=>handleFormChange("other_genes.".concat(index, ".complemented"), e.target.value),
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
                                                                            lineNumber: 291,
                                                                            columnNumber: 1345
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "Yes",
                                                                            children: "Yes"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 1380
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "No",
                                                                            children: "No"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 1412
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 1128
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 1020
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-3 gap-4 items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-sm italic pt-2",
                                                                    children: "Method:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 1509
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "col-span-2 space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            value: gene.method,
                                                                            onChange: (e)=>handleFormChange("other_genes.".concat(index, ".method"), e.target.value),
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
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 1795
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Homologous Recombination",
                                                                                    children: "Homologous Recombination"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 1837
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "UV Mutagenesis",
                                                                                    children: "UV Mutagenesis"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 1911
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Chemical Mutagenesis",
                                                                                    children: "Chemical Mutagenesis"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 1965
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "CRISPR",
                                                                                    children: "CRISPR"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 2031
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Other",
                                                                                    children: "Other (Please specify)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 2069
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "Unknown",
                                                                                    children: "Unknown"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                                    lineNumber: 291,
                                                                                    columnNumber: 2122
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 1601
                                                                        }, this),
                                                                        gene.method === 'Homologous Recombination' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: gene.markerGene,
                                                                            onChange: (e)=>handleFormChange("other_genes.".concat(index, ".markerGene"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            placeholder: "Specify marker gene"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 2218
                                                                        }, this),
                                                                        gene.method === 'Chemical Mutagenesis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: gene.chemicalName,
                                                                            onChange: (e)=>handleFormChange("other_genes.".concat(index, ".chemicalName"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            placeholder: "Specify chemical"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 2470
                                                                        }, this),
                                                                        gene.method === 'Other' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: gene.otherMethod,
                                                                            onChange: (e)=>handleFormChange("other_genes.".concat(index, ".otherMethod"), e.target.value),
                                                                            className: "w-full p-2 border-2 rounded-lg",
                                                                            placeholder: "Specify other method"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 2708
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 1563
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 1457
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-3 gap-4 items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-sm italic",
                                                                    children: "Mutation Date (Optional):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 2985
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "date",
                                                                    value: gene.mutationDate,
                                                                    onChange: (e)=>handleFormChange("other_genes.".concat(index, ".mutationDate"), e.target.value),
                                                                    className: "col-span-2 w-full p-2 border-2 rounded-lg",
                                                                    style: {
                                                                        borderColor: 'var(--silver)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 3052
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 2932
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 979
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/isolate-form/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 810
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/app/isolate-form/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 266
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addOtherGene,
                                className: "mt-2 text-sm font-medium text-blue-600 hover:text-blue-800",
                                children: "+ Add Another Gene"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 291,
                                columnNumber: 3309
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 291,
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
                                lineNumber: 292,
                                columnNumber: 101
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "strain_origin",
                                value: formData.strain_origin,
                                onChange: (e)=>handleFormChange('strain_origin', e.target.value),
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
                                        lineNumber: 292,
                                        columnNumber: 411
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Strain Center",
                                        children: "From a Strain Center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 453
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Shared by Lab",
                                        children: "Shared by Another Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 512
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "In-house",
                                        children: "Generated In-house"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 572
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 292,
                                columnNumber: 201
                            }, this),
                            formData.strain_origin === 'Strain Center' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.strain_center_name,
                                        onChange: (e)=>handleFormChange('strain_center_name', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Name of Center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 752
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.strain_center_location,
                                        onChange: (e)=>handleFormChange('strain_center_location', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Location of Center"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 942
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: formData.strain_center_date,
                                        onChange: (e)=>handleFormChange('strain_center_date', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Date Sent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 1144
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 292,
                                columnNumber: 681
                            }, this),
                            formData.strain_origin === 'Shared by Lab' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid md:grid-cols-3 gap-4 mt-2 p-2 bg-gray-50 rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.sharing_lab_name,
                                        onChange: (e)=>handleFormChange('sharing_lab_name', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Name of Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 1456
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.sharing_lab_institute,
                                        onChange: (e)=>handleFormChange('sharing_lab_institute', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Institute of Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 1639
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.sharing_lab_location,
                                        onChange: (e)=>handleFormChange('sharing_lab_location', e.target.value),
                                        className: "p-2 border rounded",
                                        placeholder: "Location of Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/isolate-form/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 1837
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 292,
                                columnNumber: 1385
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "other_mutations",
                                className: "block text-sm font-medium mb-2",
                                children: "Other General Genotype Info"
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 293,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                id: "other_mutations",
                                value: formData.other_mutations,
                                onChange: (e)=>handleFormChange('other_mutations', e.target.value),
                                rows: 3,
                                className: "w-full p-3 border-2 rounded-lg",
                                style: {
                                    borderColor: 'var(--silver)'
                                },
                                placeholder: "e.g., Reporter::GFP, general strain background notes, etc."
                            }, void 0, false, {
                                fileName: "[project]/src/app/isolate-form/page.tsx",
                                lineNumber: 293,
                                columnNumber: 125
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    submitMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-lg text-center ".concat(submitMessage.includes('Error') || submitMessage.includes('Please fill') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'),
                        children: submitMessage
                    }, void 0, false, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 294,
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
                            lineNumber: 295,
                            columnNumber: 43
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/isolate-form/page.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/isolate-form/page.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/isolate-form/page.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_s(IsolateForm, "YWRSB7wW4uFm/BioIsANfN+19Z4=");
_c = IsolateForm;
var _c;
__turbopack_context__.k.register(_c, "IsolateForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_isolate-form_page_tsx_f5d4c2dd._.js.map