export const transformSeoPageSections = (req, res, next) => {
	const originalJson = res.json;

	res.json = function (data) {
		if (data && data.data && data.data.data && Array.isArray(data.data.data)) {
			data.data.data = data.data.data.map(page => {
				if (page.sections && Array.isArray(page.sections)) {
					page.sections = page.sections.map(section => {
						if (section.list && Array.isArray(section.list) && section.list.length > 0) {
							try {
								const parsedData = section.list.map(item => {
									if (typeof item === 'string') {
										try {
											return JSON.parse(item);
										} catch {
											return item;
										}
									}
									return item;
								});
								if (parsedData.length > 0 && parsedData.some(item => typeof item === 'object')) {
									section.data = parsedData;
								}
							} catch (error) {
								console.warn('Error parsing section list data:', error);
							}
						}
						if (!section.data) {
							section.data = [];
						}

						return section;
					});
				}
				return page;
			});
		}
		return originalJson.call(this, data);
	};

	next();
};


export const transformSingleSeoPageSections = (req, res, next) => {
	// Store original json method
	const originalJson = res.json;

	// Override json method to transform data before sending
	res.json = function (data) {
		// Handle both single page responses and nested data structures
		let targetData = data;
		if (data && data.data) {
			targetData = data.data;
		}

		if (targetData && targetData.sections && Array.isArray(targetData.sections)) {
			// Transform each section
			targetData.sections = targetData.sections.map(section => {
				if (section.list && Array.isArray(section.list) && section.list.length > 0) {
					try {
						const parsedData = section.list.map(item => {
							if (typeof item === 'string') {
								try {
									return JSON.parse(item);
								} catch {
									return item;
								}
							}
							return item;
						});

						// Only update data field if we have parsed items
						if (parsedData.length > 0 && parsedData.some(item => typeof item === 'object')) {
							section.data = parsedData;
						}
					} catch (error) {
						console.warn('Error parsing section list data:', error);
					}
				}

				// Ensure data field exists even if empty
				if (!section.data) {
					section.data = [];
				}

				return section;
			});
		}

		// Call original json method with transformed data
		return originalJson.call(this, data);
	};

	next();
};


export function sectionsArrayToObject(req, res, next) {
	if (Array.isArray(req.body.sections)) {
		const sectionsObj = {};
		req.body.sections.forEach(section => {
			if (section.name) {
				const { name, data, ...otherSectionData } = section;
				sectionsObj[name] = data || otherSectionData;
			}
		});
		req.body.sections = sectionsObj;
	}
	next();
}

export function transformSeoPageSectionsForFrontend(req, res, next) {
	const originalJson = res.json;

	res.json = function (data) {
		if (
			data &&
			data.data &&
			data.data.sections &&
			typeof data.data.sections === "object" &&
			!Array.isArray(data.data.sections)
		) {
			const { slug, sections } = data.data;

			// --- Handle FAQ Page ---
			if (slug === "faq") {
				const faqArray = Object.values(sections).map(section => ({
					title: section.title || "",
					subtitle: section.subtitle || "",
				}));
				data.data.sections = { faqData: faqArray };
			}

			// --- Handle Privacy Page ---
			else if (slug === "privacy") {
				const privacyArray = Object.values(sections).map(section => ({
					title: section.title || "",
					subtitle: section.subtitle || "",
				}));
				data.data.sections = { privacyData: privacyArray };
			}

			// --- Handle Terms Page ---
			else if (slug === "terms") {
				const termsArray = Object.values(sections).map(section => ({
					title: section.title || "",
					subtitle: section.subtitle || "",
				}));
				data.data.sections = { termsData: termsArray };
			}

			// ---  Handle About Page (retain your cleanup logic) ---
			// else if (slug === "about") {
			// 	const sectionsObj = {};
			// 	for (const [key, section] of Object.entries(sections)) {
			// 	if (Array.isArray(section)) {
			// 		sectionsObj[key] = section.map(item => {
			// 		let newItem = { ...item };
			// 		if (Array.isArray(newItem.list)) {
			// 			newItem.description = newItem.list;
			// 			delete newItem.list;
			// 		}
			// 		if ("images" in newItem) delete newItem.images;
			// 		return newItem;
			// 		});
			// 	} else if (typeof section === "object" && section !== null) {
			// 		let newItem = { ...section };
			// 		if (Array.isArray(newItem.list)) {
			// 		newItem.description = newItem.list;
			// 		delete newItem.list;
			// 		}
			// 		if ("images" in newItem) delete newItem.images;
			// 		sectionsObj[key] = [newItem];
			// 	} else {
			// 		sectionsObj[key] = [];
			// 	}
			// 	}
			// 	data.data.sections = sectionsObj;
			// }
		}

		else if (data && data.data && (!data.data.sections || Object.keys(data.data.sections).length === 0)) {
			data.data.sections = {};
		}

		return originalJson.call(this, data);
	};

	next();
}



// middlewares/seoPageFrontendTransform.js
// export function transformSeoPageSectionsForFrontend(req, res, next) {
//   const originalJson = res.json;
//   res.json = function (data) {
//     if (data &&
//       data.data &&
//       data.data.sections &&
//       typeof data.data.sections === 'object' &&
//       !Array.isArray(data.data.sections))
//       {
//         const slug = data.data.slug;
//       if (slug === 'faq' && data.data.sections.faqData && Array.isArray(data.data.sections.faqData.list)) {
//         const faqList = data.data.sections.faqData.list.map(item => {
//           if (typeof item === 'string') {
//             try {
//               return JSON.parse(item);
//             } catch {
//               return { title: item };
//             }
//           }
//           return item;
//         });
//         data.data.sections = { faqData: faqList };
//       } else if (data.data.slug === 'about') {
//         const sectionsObj = {};
//         for (const [key, section] of Object.entries(data.data.sections)) {
//           if (Array.isArray(section)) {
//             sectionsObj[key] = section.map(item => {
//               let newItem = { ...item };
//               if (Array.isArray(newItem.list)) {
//                 newItem.description = newItem.list;
//                 delete newItem.list;
//               }
//               if ('images' in newItem) {
//                 delete newItem.images;
//               }
//               return newItem;
//             });
//           } else if (typeof section === 'object' && section !== null) {
//             let newItem = { ...section };
//             if (Array.isArray(newItem.list)) {
//               newItem.description = newItem.list;
//               delete newItem.list;
//             }
//             if ('images' in newItem) {
//               delete newItem.images;
//             }
//             sectionsObj[key] = [newItem];
//           } else {
//             sectionsObj[key] = [];
//           }
//         }
//         data.data.sections = sectionsObj;
//       }
//       // For all other slugs, leave sections as object (no transformation)
//     } else if (data && data.data && (!data.data.sections || Object.keys(data.data.sections).length === 0)) {
//       // Terms or empty: always return object
//       data.data.sections = {};
//     }
//     return originalJson.call(this, data);
//   };
//   next();
// }