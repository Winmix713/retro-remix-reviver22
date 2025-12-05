// components
import { Responsive } from 'react-grid-layout'; // Removed WidthProvider (not needed with SizeMe)
import { SizeMe } from 'react-sizeme'; // Changed from withSize to SizeMe
import { Fragment } from 'react';

// layouts
import layouts from '../layouts';

// hooks
import { useThemeProvider } from '@contexts/themeContext';
import { useWindowSize } from 'react-use';
// Removed useMemo as we don't need to construct HOCs anymore

// utils
import PropTypes from 'prop-types';

const AppGrid = ({ widgets, id }) => {
    const { fontScale } = useThemeProvider();
    
    // Rename to windowWidth to avoid confusion with the grid width
    const { width: windowWidth } = useWindowSize();

    const breakpoints = {
        md: windowWidth >= 768 && windowWidth < 1280,
        lg: windowWidth >= 1280 && windowWidth < 1500,
        xl: windowWidth >= 1500
    }

    return (
        <div className="layout">
            {
                windowWidth >= 768 ? (
                    /* 
                       SizeMe safely measures this section without using findDOMNode.
                       It passes the explicit 'size.width' to the grid.
                    */
                    <SizeMe refreshMode="debounce" refreshRate={200}>
                        {({ size }) => (
                            /* Only render grid when we have a width to prevent layout thrashing */
                            size.width ? (
                                <Responsive
                                    className="w-100"
                                    width={size.width} // Pass width directly here
                                    layouts={layouts[id]}
                                    breakpoints={breakpoints}
                                    cols={{ xl: 4, lg: 3, md: 2 }}
                                    rowHeight={fontScale === 1 ? 220 : 220 + (fontScale * 3)}
                                    isDraggable={false}
                                    isResizable={false}
                                    margin={[25, 20]}
                                    autoSize={true}
                                    useCSSTransforms={false}
                                >
                                    {
                                        Object.keys(widgets).map(widget => (
                                            <div key={widget}>
                                                {widgets[widget]}
                                            </div>
                                        ))
                                    }
                                </Responsive>
                            ) : null
                        )}
                    </SizeMe>
                ) : (
                    // Mobile View
                    <>
                        {
                            Object.keys(widgets).map(widget => (
                                <Fragment key={widget}>
                                    {widgets[widget]}
                                </Fragment>
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

AppGrid.propTypes = {
    widgets: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
}

export default AppGrid