"use client";

type ExpenseFormProps = {
  formData: {
    title: string;
    category: string;
    description: string;
    amount: string | number;
    date: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export default function ExpenseForm({
  onClose,
  onChange,
  onSubmit,
  formData,
}: ExpenseFormProps) {
  return (
    <div className="flex justify-center px-3 sm:px-4">
      <div
        className="
          w-full
          max-w-xl
          bg-white
          rounded-2xl
          shadow-sm
          border border-gray-200
          p-4 sm:p-6
          mb-28
        "
      >
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">
          Add Expense
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Eg: Grocery shopping"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
          </div>

          {/* Category + Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={onChange}
                placeholder="Food, Travel, Rent..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={onChange}
                placeholder="₹0"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Optional notes"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
