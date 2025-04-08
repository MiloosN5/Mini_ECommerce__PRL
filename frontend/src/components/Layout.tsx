interface LayoutProps {
    blockPrefix: string;
    style?: any;
    children: React.ReactNode;
}

const Layout = ({ blockPrefix, style, children }: LayoutProps) => {
    return (
        <div className={`${blockPrefix}-layout`} style={style ? style : undefined}>
            {children}
        </div>
    );
};

export default Layout;
