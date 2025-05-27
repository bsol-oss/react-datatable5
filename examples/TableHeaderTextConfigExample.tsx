import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { TableHeader } from '@/components/DataTable/display/TableHeader';
import { DataTable } from '@/components/DataTable/DataTable';

// Example data type
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// Sample data
const sampleData: Product[] = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics" },
  { id: 2, name: "Book", price: 15, category: "Education" },
  { id: 3, name: "Coffee Mug", price: 12, category: "Kitchen" },
];

const columnHelper = createColumnHelper<Product>();

// Example 1: Using default texts
export const DefaultTextsExample = () => {
  const columns = [
    columnHelper.accessor("name", {
      header: "Product Name",
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
    columnHelper.accessor("category", {
      header: "Category",
    }),
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      renderTable={(table) => (
        <div>
          {/* Uses default texts: "Pin Column", "Sort Ascending", etc. */}
          <TableHeader />
          {/* ... rest of table */}
        </div>
      )}
    />
  );
};

// Example 2: Custom default texts for all columns
export const CustomDefaultTextsExample = () => {
  const columns = [
    columnHelper.accessor("name", {
      header: "Product Name",
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      renderTable={(table) => (
        <div>
          <TableHeader 
            defaultTexts={{
              pinColumn: "📌 Pin This Column",
              sortAscending: "🔼 Sort A→Z",
              sortDescending: "🔽 Sort Z→A",
              clearSorting: "❌ Remove Sorting",
              cancelPin: "📌 Unpin Column"
            }}
          />
          {/* ... rest of table */}
        </div>
      )}
    />
  );
};

// Example 3: Per-column custom texts
export const PerColumnTextsExample = () => {
  const columns = [
    columnHelper.accessor("name", {
      header: "Product Name",
      meta: {
        headerTexts: {
          pinColumn: "Pin Product Names",
          sortAscending: "Sort Products A-Z",
          sortDescending: "Sort Products Z-A"
        }
      }
    }),
    columnHelper.accessor("price", {
      header: "Price",
      meta: {
        headerTexts: {
          pinColumn: "Pin Price Column",
          sortAscending: "Lowest Price First",
          sortDescending: "Highest Price First",
          clearSorting: "Remove Price Sorting"
        }
      }
    }),
    columnHelper.accessor("category", {
      header: "Category",
      // This column will use default texts
    }),
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      renderTable={(table) => (
        <div>
          <TableHeader />
          {/* ... rest of table */}
        </div>
      )}
    />
  );
};

// Example 4: Mixed configuration with internationalization
export const InternationalizedExample = () => {
  // Simulated translation function
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'table.pinColumn': 'Épingler la colonne',
      'table.sortAscending': 'Trier croissant',
      'table.sortDescending': 'Trier décroissant',
      'table.clearSorting': 'Effacer le tri',
      'table.cancelPin': 'Annuler épinglage',
      'product.pinName': 'Épingler les noms',
      'product.sortNameAsc': 'Trier noms A-Z',
    };
    return translations[key] || key;
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Nom du produit",
      meta: {
        headerTexts: {
          pinColumn: t('product.pinName'),
          sortAscending: t('product.sortNameAsc'),
        }
      }
    }),
    columnHelper.accessor("price", {
      header: "Prix",
      // Will use the global French defaults
    }),
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      renderTable={(table) => (
        <div>
          <TableHeader 
            defaultTexts={{
              pinColumn: t('table.pinColumn'),
              sortAscending: t('table.sortAscending'),
              sortDescending: t('table.sortDescending'),
              clearSorting: t('table.clearSorting'),
              cancelPin: t('table.cancelPin')
            }}
          />
          {/* ... rest of table */}
        </div>
      )}
    />
  );
};

// Example 5: TypeScript usage with proper typing
export const TypeScriptExample = () => {
  // Import the type for better TypeScript support
  // import { TableHeaderTexts } from '@/components/DataTable/display/TableHeader';
  
  const customTexts = {
    pinColumn: "Pin Column",
    sortAscending: "Sort A-Z",
    // TypeScript will ensure only valid keys are used
  } satisfies Partial<import('@/components/DataTable/display/TableHeader').TableHeaderTexts>;

  const columns = [
    columnHelper.accessor("name", {
      header: "Product Name",
    }),
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      renderTable={(table) => (
        <div>
          <TableHeader defaultTexts={customTexts} />
          {/* ... rest of table */}
        </div>
      )}
    />
  );
}; 