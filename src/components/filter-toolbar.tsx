import { motion, AnimatePresence } from 'framer-motion';

// Define prop types for the filter toolbar
interface FilterToolBarProps {
  onClearFilter: () => void;
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
  onFilterChange: (filterType: string | null) => void;
  sortOrder: 'asc' | 'desc';
  filterType: string | null;
  totalCount: number;
  filteredCount: number;
}

const FilterToolBar = ({
  onClearFilter,
  onSortChange,
  onFilterChange,
  sortOrder = 'desc',
  filterType = null,
  totalCount = 0,
  filteredCount = 0,
}: FilterToolBarProps) => {
  return (
    <section className="w-full px-4 py-2 md:py-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="rounded-xl border border-slate-700 bg-slate-900/50 p-2 shadow-md shadow-gray-900/30 md:p-4"
          initial={{ opacity: 0.9, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-xl text-slate-200 md:text-xl">Filters</h1>
              <AnimatePresence mode="wait">
                {filterType && (
                  <motion.p
                    key={filterType}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-slate-400"
                  >
                    Showing {filteredCount} of {totalCount} transactions
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              {/* Sort by date */}
              <div className="flex-col items-center space-x-2">
                <span className="text-sm text-slate-400">Sort:</span>
                <select
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-white"
                  value={sortOrder}
                  onChange={e => onSortChange(e.target.value as 'asc' | 'desc')}
                >
                  <option value="desc">Newest first</option>
                  <option value="asc">Oldest first</option>
                </select>
              </div>

              {/* Filter by transaction type */}
              <div className="flex-col items-center space-x-2">
                <span className="text-sm text-slate-400">Transaction type:</span>
                <select
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-white"
                  value={filterType || ''}
                  onChange={e => onFilterChange(e.target.value === '' ? null : e.target.value)}
                >
                  <option value="">All transactions</option>
                  <option value="deposit">Deposits only</option>
                  <option value="withdrawal">Withdrawals only</option>
                </select>
              </div>

              <div>
                <button className="cursor-pointer" onClick={onClearFilter}>
                  ❌
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FilterToolBar;
