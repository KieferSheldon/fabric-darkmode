/**
 * Global list of CSS selectors that Dark Reader should skip when generating dark mode styles.
 * This is used for Microsoft Fabric / Power BI elements that should remain unchanged.
 */

// Selectors for PBI report elements that should not have dark mode applied
// IMPORTANT: Be specific to avoid affecting other Fabric experiences like Lakehouses
const ignoredSelectorsForPBI: string[] = [
    // Slicer elements (PBI-specific)
    '.slicer-dropdown-popup',
    '.slicer-dropdown-content',
    '.slicer-restatement',
    '.slicerHeader',
    '.slicerText',
    '.slicerBody',
    // Filter restatement (tooltip showing filters)
    '.filterRestatement',
    '.filters-and-slicers-popup',
    // PBI search boxes and form fields
    '.searchBox',
    '.pbi-form-field',
    '.mdc-text-field__input',
    'search-box-modern',
    // PBI Menus (specific class names)
    '.pbi-menu',
    '.pbi-menu-item',
    '.tooltip-container',
    // PBI Report-specific visual containers (using full class patterns to avoid false matches)
    '.visualContainerHost',
    '.visualBackgroundContainer',
    '.vcBody',
    // PBI exploration container for reports
    '.exploration',
];

/**
 * Check if a CSS selector should be ignored (not have dark mode styles applied)
 * @param selector The CSS selector to check
 * @returns true if the selector matches any ignored pattern
 */
export function shouldIgnoreSelector(selector: string): boolean {
    if (!selector) {
        return false;
    }
    
    // Check if selector contains any of our ignored patterns
    for (const pattern of ignoredSelectorsForPBI) {
        // For attribute selectors like [class*="..."], check if selector contains the pattern
        if (pattern.startsWith('[')) {
            if (selector.includes(pattern)) {
                return true;
            }
        } else {
            // For class/element selectors, check if the selector targets this class
            // e.g., ".slicer-dropdown-popup" should match ".slicer-dropdown-popup", ".slicer-dropdown-popup > div", etc.
            if (selector.includes(pattern)) {
                return true;
            }
        }
    }
    
    return false;
}
