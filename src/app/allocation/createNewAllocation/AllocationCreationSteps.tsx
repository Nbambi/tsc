
import { useState } from 'react'; 
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import './AllocationCreationSteps.scss'
export default function AllocationCreationSteps() {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span 
                onClick={() => setActiveIndex(itemIndex)}
            >
                <span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
                >
                    <i className={`${item.icon} text-xl`} />
                </span>
                <span>{item.label}</span>
            </span>
        );
    };

    const items: MenuItem[] = [
        {
            icon: 'pi pi-check',
            label: 'Personal Info',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-check',
            label: 'Personal Info',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            label: 'Personal Info',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    const topRenderer = (items, activeIndex) => {
        return items.map((item,index) => {
            return (
                <span style={{
                    display: "inline-block",
                    width:`${Math.floor(100/items.length)}%`,
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor: activeIndex === index ? "red" : '#555555'
                }}></span>
            )
        })
    }

    return (
        <div className="card">
            {topRenderer(items, activeIndex)}
            <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" />
        </div>
    )
}
        