/**
 * Slicer Popup Fix for Power BI
 * 
 * Dark Reader's CSS modifications don't properly exclude Power BI slicer dropdown popups.
 * This module uses a MutationObserver to detect when slicer popups appear and applies
 * inline styles to force them back to light mode, preserving the original report appearance.
 */

let slicerObserver: MutationObserver | null = null;

/**
 * Check if an element is a slicer dropdown popup (not the main slicer on the report)
 */
function isSlicerDropdownPopup(element: HTMLElement): boolean {
    // Only target the floating dropdown popup, not slicers embedded in the report
    // The popup has class "slicer-dropdown-popup" and is typically a direct child of body
    // or has specific positioning styles
    if (!element.classList.contains('slicer-dropdown-popup')) {
        return false;
    }
    
    // Check if it's a floating popup (has transform or absolute/fixed positioning)
    const style = window.getComputedStyle(element);
    const isFloating = style.position === 'absolute' || style.position === 'fixed' || 
                       style.transform !== 'none';
    
    return isFloating;
}

/**
 * Fix the slicer dropdown menu box (the combobox you click to open the dropdown)
 */
function fixSlicerMenuBox(menu: HTMLElement): void {
    // Remove dark border/outline that Dark Reader applies
    menu.style.setProperty('border-color', '#d0d0d0', 'important');
    menu.style.setProperty('outline', 'none', 'important');
}

/**
 * Fix slicer header text color (Dark Reader makes it too light)
 */
function fixSlicerHeaderText(header: HTMLElement): void {
    // Force dark text color to match original report styling
    header.style.setProperty('color', '#252423', 'important');
    // Remove any darkreader inline color attributes
    header.removeAttribute('data-darkreader-inline-color');
}

/**
 * Apply light mode styles to a slicer dropdown popup element
 */
function fixSlicerPopup(popup: HTMLElement): void {
    // Double-check this is actually a dropdown popup
    if (!isSlicerDropdownPopup(popup)) {
        return;
    }

    // Remove any invert filter and force white background
    popup.style.setProperty('filter', 'none', 'important');
    popup.style.setProperty('background-color', '#ffffff', 'important');
    popup.style.setProperty('background', '#ffffff', 'important');
    popup.style.setProperty('border', '1px solid #e0e0e0', 'important');
    popup.style.setProperty('border-color', '#e0e0e0', 'important');
    popup.style.setProperty('box-shadow', '0 2px 8px rgba(0,0,0,0.15)', 'important');

    // Fix specific child elements - be more targeted
    // Fix slicer-dropdown-content
    popup.querySelectorAll('.slicer-dropdown-content').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background-color', '#ffffff', 'important');
        htmlEl.style.setProperty('background', '#ffffff', 'important');
    });

    // Fix slicerContainer
    popup.querySelectorAll('.slicerContainer').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background-color', '#ffffff', 'important');
        htmlEl.style.setProperty('background', '#ffffff', 'important');
    });

    // Fix slicerBody
    popup.querySelectorAll('.slicerBody').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background-color', '#ffffff', 'important');
        htmlEl.style.setProperty('background', '#ffffff', 'important');
        htmlEl.style.setProperty('color', '#333333', 'important');
    });

    // Fix scroll wrappers
    popup.querySelectorAll('.scroll-wrapper, .scrollbar-inner, .scroll-content').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background-color', '#ffffff', 'important');
        htmlEl.style.setProperty('background', '#ffffff', 'important');
        htmlEl.style.setProperty('color', '#333333', 'important');
    });

    // Fix row items inside the popup
    popup.querySelectorAll('.row, [class*="slicerItem"]').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background-color', '#ffffff', 'important');
        htmlEl.style.setProperty('color', '#333333', 'important');
    });

    // Fix text spans inside the popup
    popup.querySelectorAll('.slicerText, span.slicerText').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('color', '#333333', 'important');
        htmlEl.style.setProperty('background', 'transparent', 'important');
    });

    // Fix checkboxes
    popup.querySelectorAll('[class*="checkbox"], [class*="Checkbox"], .glyphicon').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background-color', '#ffffff', 'important');
        htmlEl.style.setProperty('border-color', '#666666', 'important');
        htmlEl.style.setProperty('color', '#333333', 'important');
    });
}

/**
 * Check and fix all existing slicer popups on the page
 */
function fixExistingSlicerPopups(): void {
    document.querySelectorAll('.slicer-dropdown-popup').forEach((popup: Element) => {
        const htmlEl = popup as HTMLElement;
        if (isSlicerDropdownPopup(htmlEl)) {
            fixSlicerPopup(htmlEl);
        }
    });
}

/**
 * Fix all existing slicer menu boxes (comboboxes) on the page
 */
function fixExistingSlicerMenuBoxes(): void {
    document.querySelectorAll('.slicer-dropdown-menu, [data-testid="slicer-dropdown"]').forEach((menu: Element) => {
        fixSlicerMenuBox(menu as HTMLElement);
    });
}

/**
 * Fix all existing slicer header text elements on the page
 */
function fixExistingSlicerHeaders(): void {
    document.querySelectorAll('.slicer-header-text, h3.slicer-header-text').forEach((header: Element) => {
        fixSlicerHeaderText(header as HTMLElement);
    });
}

/**
 * Fix a filter restatement element (the "Filters and slicers affecting this visual" popup)
 */
function fixFilterRestatement(element: HTMLElement): void {
    // Remove darkreader attributes
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-color');
    element.removeAttribute('data-darkreader-inline-border');
    element.removeAttribute('data-darkreader-inline-border-top');
    element.removeAttribute('data-darkreader-inline-border-bottom');
    element.removeAttribute('data-darkreader-inline-border-left');
    element.removeAttribute('data-darkreader-inline-border-right');
    
    // Force original light colors
    element.style.setProperty('background-color', 'rgb(255, 255, 255)', 'important');
    element.style.setProperty('color', 'rgb(37, 36, 35)', 'important');
    element.style.setProperty('border-color', 'rgb(200, 200, 200)', 'important');
}

/**
 * Fix all children of a filter restatement element
 */
function fixFilterRestatementChildren(parent: HTMLElement): void {
    parent.querySelectorAll('*').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeAttribute('data-darkreader-inline-bgcolor');
        htmlEl.removeAttribute('data-darkreader-inline-color');
        htmlEl.removeAttribute('data-darkreader-inline-border');
        htmlEl.style.setProperty('color', 'rgb(37, 36, 35)', 'important');
    });
}

/**
 * Check if an element is a filter restatement component
 */
function isFilterRestatement(element: HTMLElement): boolean {
    return element.classList.contains('filterRestatement') ||
           element.classList.contains('filter-restatement-container') ||
           element.classList.contains('filterRestatementCard') ||
           element.tagName.toLowerCase() === 'filter-restatement-overlay' ||
           element.tagName.toLowerCase() === 'filter-restatement-card';
}

/**
 * Fix all existing filter restatement elements on the page
 */
function fixExistingFilterRestatements(): void {
    document.querySelectorAll('.filterRestatement, .filter-restatement-container, filter-restatement-overlay, filter-restatement-card, .filterRestatementCard').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        fixFilterRestatement(htmlEl);
        fixFilterRestatementChildren(htmlEl);
    });
}

/**
 * Fix a PBI menu element (visual options popup like Copy, Share, etc.)
 */
function fixPbiMenu(element: HTMLElement): void {
    // Remove darkreader attributes
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-color');
    element.removeAttribute('data-darkreader-inline-border');
    element.removeAttribute('data-darkreader-inline-border-top');
    element.removeAttribute('data-darkreader-inline-border-bottom');
    element.removeAttribute('data-darkreader-inline-border-left');
    element.removeAttribute('data-darkreader-inline-border-right');
    
    // Force original light colors
    element.style.setProperty('background-color', 'rgb(255, 255, 255)', 'important');
    element.style.setProperty('color', 'rgb(37, 36, 35)', 'important');
    element.style.setProperty('border-color', 'rgb(225, 223, 221)', 'important');
}

/**
 * Fix all children of a PBI menu element
 */
function fixPbiMenuChildren(parent: HTMLElement): void {
    parent.querySelectorAll('*').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeAttribute('data-darkreader-inline-bgcolor');
        htmlEl.removeAttribute('data-darkreader-inline-color');
        htmlEl.removeAttribute('data-darkreader-inline-border');
        htmlEl.style.setProperty('color', 'rgb(37, 36, 35)', 'important');
        htmlEl.style.setProperty('background-color', 'transparent', 'important');
    });
}

/**
 * Check if an element is a PBI menu component
 */
function isPbiMenu(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    const testId = element.getAttribute('data-testid') || '';
    return tagName === 'pbi-menu' ||
           element.classList.contains('pbi-menu-compact') ||
           testId.includes('pbimenu') ||
           testId.includes('pbi-menu');
}

/**
 * Fix all existing PBI menu elements on the page
 */
function fixExistingPbiMenus(): void {
    document.querySelectorAll('[data-testid*="pbimenu"], [data-testid*="pbi-menu"], pbi-menu, .pbi-menu-compact').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        fixPbiMenu(htmlEl);
        fixPbiMenuChildren(htmlEl);
    });
}

/**
 * Fix a visual title element by preserving its original inline color
 * The inline style contains the report author's intended color
 */
function fixVisualTitle(element: HTMLElement): void {
    // Remove Dark Reader's inline attributes
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-color');
    element.removeAttribute('data-darkreader-inline-border');
    
    // Get the color from the element's inline style attribute (author-defined)
    const inlineStyle = element.getAttribute('style') || '';
    const colorMatch = inlineStyle.match(/(?:^|;)\s*color:\s*([^;]+)/i);
    
    if (colorMatch && colorMatch[1]) {
        // Re-apply the original inline color with !important to override Dark Reader CSS
        element.style.setProperty('color', colorMatch[1].trim(), 'important');
    }
}

/**
 * Fix all children of a visual title element
 */
function fixVisualTitleChildren(parent: HTMLElement): void {
    parent.querySelectorAll('*').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeAttribute('data-darkreader-inline-bgcolor');
        htmlEl.removeAttribute('data-darkreader-inline-color');
        
        // Get the color from the element's inline style attribute
        const inlineStyle = htmlEl.getAttribute('style') || '';
        const colorMatch = inlineStyle.match(/(?:^|;)\s*color:\s*([^;]+)/i);
        
        if (colorMatch && colorMatch[1]) {
            htmlEl.style.setProperty('color', colorMatch[1].trim(), 'important');
        }
    });
}

/**
 * Check if an element is a visual title
 */
function isVisualTitle(element: HTMLElement): boolean {
    return element.classList.contains('visualTitle') || 
           element.getAttribute('data-testid') === 'visual-title';
}

/**
 * Fix all existing visual title elements on the page
 */
function fixExistingVisualTitles(): void {
    document.querySelectorAll('.visualTitle, [data-testid="visual-title"]').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        fixVisualTitle(htmlEl);
        fixVisualTitleChildren(htmlEl);
    });
}

/**
 * Fix a visual header item container (options buttons above visuals)
 */
function fixVisualHeaderItemContainer(element: HTMLElement): void {
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-color');
    
    element.style.setProperty('background-color', 'transparent', 'important');
    element.style.setProperty('color', 'rgb(37, 36, 35)', 'important');
}

/**
 * Fix a Monaco editor cursor element
 */
function fixMonacoCursor(element: HTMLElement): void {
    // Remove darkreader attributes
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-bgimage');
    
    // Force white cursor background for visibility in dark theme
    element.style.setProperty('background-color', '#ffffff', 'important');
    element.style.setProperty('background', '#ffffff', 'important');
}

/**
 * Check if an element is a Monaco cursor
 */
function isMonacoCursor(element: HTMLElement): boolean {
    return element.classList.contains('cursor') && 
           (element.classList.contains('monaco-mouse-cursor-text') ||
            element.closest('.monaco-editor') !== null ||
            element.closest('.aznb-monaco-editor') !== null ||
            element.closest('.monaco-container') !== null);
}

/**
 * Fix all existing Monaco cursor elements on the page
 */
function fixExistingMonacoCursors(): void {
    document.querySelectorAll('.cursor.monaco-mouse-cursor-text, .monaco-editor .cursor, .aznb-monaco-editor .cursor, .monaco-container .cursor').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        fixMonacoCursor(htmlEl);
    });
}

/**
 * Fix a tooltip container element (the popup that appears when hovering over visuals)
 * Just remove Dark Reader attributes to restore original Power BI styling
 */
function fixTooltipContainer(element: HTMLElement): void {
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-color');
    element.removeAttribute('data-darkreader-inline-border');
    element.removeAttribute('data-darkreader-inline-border-top');
    element.removeAttribute('data-darkreader-inline-border-bottom');
    element.removeAttribute('data-darkreader-inline-border-left');
    element.removeAttribute('data-darkreader-inline-border-right');
}

/**
 * Fix all children of a tooltip container
 * Just remove Dark Reader attributes to restore original Power BI styling
 */
function fixTooltipContainerChildren(parent: HTMLElement): void {
    parent.querySelectorAll('*').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeAttribute('data-darkreader-inline-bgcolor');
        htmlEl.removeAttribute('data-darkreader-inline-color');
        htmlEl.removeAttribute('data-darkreader-inline-border');
    });
}

/**
 * Check if an element is a tooltip container
 */
function isTooltipContainer(element: HTMLElement): boolean {
    return element.classList.contains('tooltip-container') && 
           element.classList.contains('enhancedTooltips');
}

/**
 * Fix all existing tooltip container elements on the page
 */
function fixExistingTooltipContainers(): void {
    document.querySelectorAll('.tooltip-container.enhancedTooltips').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        fixTooltipContainer(htmlEl);
        fixTooltipContainerChildren(htmlEl);
    });
}

/**
 * Fix all children of a visual header item container
 */
function fixVisualHeaderItemContainerChildren(parent: HTMLElement): void {
    parent.querySelectorAll('*').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeAttribute('data-darkreader-inline-bgcolor');
        htmlEl.removeAttribute('data-darkreader-inline-color');
        htmlEl.style.setProperty('background-color', 'transparent', 'important');
        htmlEl.style.setProperty('color', 'rgb(37, 36, 35)', 'important');
    });
}

/**
 * Check if an element is a visual header item container
 */
function isVisualHeaderItemContainer(element: HTMLElement): boolean {
    return element.classList.contains('visualHeaderItemContainer') ||
           element.tagName.toLowerCase() === 'visual-header-item-container';
}

/**
 * Fix all existing visual header item container elements on the page
 */
function fixExistingVisualHeaderItemContainers(): void {
    document.querySelectorAll('.visualHeaderItemContainer, visual-header-item-container').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        fixVisualHeaderItemContainer(htmlEl);
        fixVisualHeaderItemContainerChildren(htmlEl);
    });
}

/**
 * Inject a style element with high-priority CSS rules for visual titles and dividers
 * This overrides Dark Reader's generated stylesheet by using inherit
 * which forces the element to use its inline style values
 */
function injectVisualTitleStyles(): void {
    const existingStyle = document.getElementById('darkreader-fabric-visual-title-fix');
    if (existingStyle) {
        existingStyle.remove(); // Remove and recreate to ensure latest rules
    }

    const style = document.createElement('style');
    style.id = 'darkreader-fabric-visual-title-fix';
    // Use extremely high specificity with :not(#_) hack and disable Dark Reader's CSS variable
    style.textContent = `
        /* Visual title fix - disable Dark Reader's color transformation */
        [data-testid="visual-title"]:not(#_):not(#_):not(#_),
        [data-testid="visual-title"]:not(#_):not(#_):not(#_) *,
        .visualTitle:not(#_):not(#_):not(#_),
        .visualTitle:not(#_):not(#_):not(#_) *,
        .visualTitle.themableColor:not(#_):not(#_):not(#_),
        .visualTitle.themableBackgroundColor:not(#_):not(#_):not(#_) {
            --darkreader-inline-color: initial !important;
            color: inherit !important;
        }
        
        /* Visual divider fix - disable Dark Reader's border transformation */
        .visualDivider:not(#_):not(#_):not(#_),
        .visualDivider.themableColor:not(#_):not(#_):not(#_) {
            --darkreader-inline-border-top: initial !important;
            border-top-color: inherit !important;
        }
        
        /* Monaco editor text selection - VS Code-style light blue highlight */
        .monaco-editor .selected-text:not(#_):not(#_):not(#_),
        .monaco-editor .selectionHighlight:not(#_):not(#_):not(#_),
        .monaco-editor .view-line .selected-text:not(#_):not(#_):not(#_),
        .monaco-editor .view-overlays .selected-text:not(#_):not(#_):not(#_),
        .monaco-editor .cslr.selected-text:not(#_):not(#_):not(#_),
        .aznb-monaco-editor .selected-text:not(#_):not(#_):not(#_),
        .monaco-container .selected-text:not(#_):not(#_):not(#_) {
            background-color: #264f78 !important;
            --darkreader-inline-bgcolor: initial !important;
        }
        
        /* Monaco editor selection in lines */
        .monaco-editor .view-overlays .current-line:not(#_):not(#_):not(#_) {
            --darkreader-inline-bgcolor: initial !important;
        }
        
        /* Native text selection (::selection) for Monaco and SQL editors */
        .monaco-editor::selection,
        .monaco-editor *::selection,
        .aznb-monaco-editor::selection,
        .aznb-monaco-editor *::selection,
        .monaco-container::selection,
        .monaco-container *::selection,
        .sql-editor::selection,
        .sql-editor *::selection,
        .query-editor::selection,
        .query-editor *::selection {
            background-color: #264f78 !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Start observing for slicer popup mutations
 */
export function startSlicerFix(): void {
    if (slicerObserver) {
        return; // Already running
    }

    // Inject visual title styles first
    injectVisualTitleStyles();

    // Fix any existing popups, menu boxes, headers, filter restatements, PBI menus, visual titles, and header item containers
    fixExistingSlicerPopups();
    fixExistingSlicerMenuBoxes();
    fixExistingSlicerHeaders();
    fixExistingFilterRestatements();
    fixExistingPbiMenus();
    fixExistingVisualTitles();
    fixExistingVisualHeaderItemContainers();
    fixExistingMonacoCursors();
    fixExistingTooltipContainers();

    // Create observer for new elements
    slicerObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            // Check added nodes
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    // Check if the node itself is a slicer popup
                    if (node.classList.contains('slicer-dropdown-popup') && isSlicerDropdownPopup(node)) {
                        fixSlicerPopup(node);
                    }
                    // Check if the node is a slicer menu box
                    if (node.classList.contains('slicer-dropdown-menu') || 
                        node.getAttribute('data-testid') === 'slicer-dropdown') {
                        fixSlicerMenuBox(node);
                    }
                    // Check if the node is a slicer header text
                    if (node.classList.contains('slicer-header-text')) {
                        fixSlicerHeaderText(node);
                    }
                    // Check if the node is a filter restatement element
                    if (isFilterRestatement(node)) {
                        fixFilterRestatement(node);
                        fixFilterRestatementChildren(node);
                    }
                    // Check if the node is a PBI menu element
                    if (isPbiMenu(node)) {
                        fixPbiMenu(node);
                        fixPbiMenuChildren(node);
                    }
                    // Check if the node is a visual title element
                    if (isVisualTitle(node)) {
                        fixVisualTitle(node);
                        fixVisualTitleChildren(node);
                    }
                    // Check if the node is a visual header item container
                    if (isVisualHeaderItemContainer(node)) {
                        fixVisualHeaderItemContainer(node);
                        fixVisualHeaderItemContainerChildren(node);
                    }
                    // Check if the node is a Monaco cursor element
                    if (isMonacoCursor(node)) {
                        fixMonacoCursor(node);
                    }
                    // Check if the node is a tooltip container element
                    if (isTooltipContainer(node)) {
                        fixTooltipContainer(node);
                        fixTooltipContainerChildren(node);
                    }
                    // Check for slicer popups in descendants
                    node.querySelectorAll?.('.slicer-dropdown-popup').forEach((popup: Element) => {
                        const htmlEl = popup as HTMLElement;
                        if (isSlicerDropdownPopup(htmlEl)) {
                            fixSlicerPopup(htmlEl);
                        }
                    });
                    // Check for slicer menu boxes in descendants
                    node.querySelectorAll?.('.slicer-dropdown-menu, [data-testid="slicer-dropdown"]').forEach((menu: Element) => {
                        fixSlicerMenuBox(menu as HTMLElement);
                    });
                    // Check for slicer header text in descendants
                    node.querySelectorAll?.('.slicer-header-text, h3.slicer-header-text').forEach((header: Element) => {
                        fixSlicerHeaderText(header as HTMLElement);
                    });
                    // Check for filter restatement elements in descendants
                    node.querySelectorAll?.('.filterRestatement, .filter-restatement-container, filter-restatement-overlay, filter-restatement-card, .filterRestatementCard').forEach((el: Element) => {
                        const htmlEl = el as HTMLElement;
                        fixFilterRestatement(htmlEl);
                        fixFilterRestatementChildren(htmlEl);
                    });
                    // Check for PBI menu elements in descendants
                    node.querySelectorAll?.('[data-testid*="pbimenu"], [data-testid*="pbi-menu"], pbi-menu, .pbi-menu-compact').forEach((el: Element) => {
                        const htmlEl = el as HTMLElement;
                        fixPbiMenu(htmlEl);
                        fixPbiMenuChildren(htmlEl);
                    });
                    // Check for visual title elements in descendants
                    node.querySelectorAll?.('.visualTitle').forEach((el: Element) => {
                        const htmlEl = el as HTMLElement;
                        fixVisualTitle(htmlEl);
                        fixVisualTitleChildren(htmlEl);
                    });
                    // Check for visual header item containers in descendants
                    node.querySelectorAll?.('.visualHeaderItemContainer, visual-header-item-container').forEach((el: Element) => {
                        const htmlEl = el as HTMLElement;
                        fixVisualHeaderItemContainer(htmlEl);
                        fixVisualHeaderItemContainerChildren(htmlEl);
                    });
                    // Check for Monaco cursor elements in descendants
                    node.querySelectorAll?.('.cursor.monaco-mouse-cursor-text, .cursor').forEach((el: Element) => {
                        const htmlEl = el as HTMLElement;
                        if (isMonacoCursor(htmlEl)) {
                            fixMonacoCursor(htmlEl);
                        }
                    });
                    // Check for tooltip container elements in descendants
                    node.querySelectorAll?.('.tooltip-container.enhancedTooltips').forEach((el: Element) => {
                        const htmlEl = el as HTMLElement;
                        fixTooltipContainer(htmlEl);
                        fixTooltipContainerChildren(htmlEl);
                    });
                }
            });

            // Also handle attribute changes on slicer elements
            if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
                const target = mutation.target;
                if (target.classList.contains('slicer-dropdown-popup') && isSlicerDropdownPopup(target)) {
                    fixSlicerPopup(target);
                }
                if (target.classList.contains('slicer-dropdown-menu') ||
                    target.getAttribute('data-testid') === 'slicer-dropdown') {
                    fixSlicerMenuBox(target);
                }
                if (target.classList.contains('slicer-header-text')) {
                    fixSlicerHeaderText(target);
                }
                if (isFilterRestatement(target)) {
                    fixFilterRestatement(target);
                    fixFilterRestatementChildren(target);
                }
                if (isPbiMenu(target)) {
                    fixPbiMenu(target);
                    fixPbiMenuChildren(target);
                }
                if (isVisualTitle(target)) {
                    fixVisualTitle(target);
                    fixVisualTitleChildren(target);
                }
                if (isVisualHeaderItemContainer(target)) {
                    fixVisualHeaderItemContainer(target);
                    fixVisualHeaderItemContainerChildren(target);
                }
                if (isMonacoCursor(target)) {
                    fixMonacoCursor(target);
                }
                if (isTooltipContainer(target)) {
                    fixTooltipContainer(target);
                    fixTooltipContainerChildren(target);
                }
            }
        }
    });

    // Observe the entire document for changes
    slicerObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
}

/**
 * Stop observing for slicer popup mutations
 */
export function stopSlicerFix(): void {
    if (slicerObserver) {
        slicerObserver.disconnect();
        slicerObserver = null;
    }
}
