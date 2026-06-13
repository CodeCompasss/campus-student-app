import { Pencil, Trash2 } from 'lucide-react';
import { Expense } from '@/lib/expense/types';

type Props = Expense & {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ExpenseCard({
  title,
  amount,
  category,
  description,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        hover:shadow-md
        transition-shadow
        p-4 sm:p-5
      
        w-full
       
        text-black
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            {category}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="font-bold text-base sm:text-lg text-blue-600">
            ₹{amount}
          </span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
          {description}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Pencil className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-50 transition"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
