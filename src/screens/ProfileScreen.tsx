{/* Settings Sections */ }
{
  settingSections.map((section, sectionIndex) => (
    <motion.div
      key={section.title}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 * (sectionIndex + 1) }}
    >
      <h3 className="mb-3 font-medium text-foreground">{section.title}</h3>
      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        {section.items.map((item, itemIndex) => {
          const Icon = item.icon;
          const isClickableRow = !item.action.type || item.action.type.name === 'ChevronRight';

          // Base layout styles for rows
          const rowClasses = `w-full flex items-center justify-between p-4 transition-colors ${itemIndex !== section.items.length - 1 ? 'border-b border-border' : ''
            } ${isClickableRow ? 'hover:bg-secondary/50 cursor-pointer' : ''}`;

          const content = (
            <>
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              {item.action}
            </>
          );

          // If the item just redirects or opens a menu, use a button wrapper
          if (isClickableRow) {
            return (
              <button
                key={itemIndex}
                onClick={() => {
                  /* Add your row navigation logic here if needed */
                  console.log(`Clicked ${item.label}`);
                }}
                className={rowClasses}
              >
                {content}
              </button>
            );
          }

          // If it houses a Switch, use a safe semantic div wrapper to prevent button nesting
          return (
            <div key={itemIndex} className={rowClasses}>
              {content}
            </div>
          );
        })}
      </div>
    </motion.div>
  ))
}