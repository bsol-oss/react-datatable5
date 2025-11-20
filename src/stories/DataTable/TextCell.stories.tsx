import { Provider } from '@/components/ui/provider';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DataTable,
  DefaultTable,
  GlobalFilter,
  TextCell,
  useDataTable,
} from '../../index';
import { data, Product } from '../product_data';

const meta = {
  title: 'react-datatable5/DataTable/TextCell',
  component: DefaultTable,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
} satisfies Meta<typeof DefaultTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Extended Product interface for demo purposes
interface ExtendedProduct extends Product {
  tags?: string[];
  website?: string;
  status?: 'active' | 'inactive' | 'pending';
  orderId?: string;
}

// Sample data with extended fields for showcasing TextCell features
const extendedData: ExtendedProduct[] = data
  .slice(0, 10)
  .map((item, index) => ({
    ...item,
    tags: ['featured', 'new', 'popular'].slice(0, (index % 3) + 1),
    website:
      index % 2 === 0 ? `https://example.com/products/${item.id}` : undefined,
    status: ['active', 'inactive', 'pending'][index % 3] as
      | 'active'
      | 'inactive'
      | 'pending',
    orderId: `ORD-${String(item.id).padStart(6, '0')}`,
  }));

const columnHelper = createColumnHelper<ExtendedProduct>();

// Story 1: Basic Text Display
const BasicTextColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => <TextCell text={props.row.original.title} />,
    size: 200,
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    cell: (props) => <TextCell text={`$${props.row.original.price}`} />,
    size: 100,
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
    cell: (props) => <TextCell text={props.row.original.stock} />,
    size: 100,
  }),
];

export const BasicTextDisplay: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Basic Text Display
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            Simple text display using the new <code>text</code> prop.
          </Text>
          <DataTable
            columns={BasicTextColumns}
            data={extendedData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 2: Links with href
const LinkColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.title}
        href={props.row.original.website}
      />
    ),
    size: 250,
  }),
  columnHelper.accessor('website', {
    header: () => <span>Website</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.website || 'No website'}
        href={props.row.original.website}
      />
    ),
    size: 200,
  }),
];

export const LinksWithHref: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Links with href
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell can display clickable links using the <code>href</code>{' '}
            prop. Links open in a new tab with an external link icon.
          </Text>
          <DataTable columns={LinkColumns} data={extendedData} {...datatable}>
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 3: Clickable Text with onClick
const ClickableColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title (Clickable)</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.title}
        onClick={() => {
          alert(`Clicked on: ${props.row.original.title}`);
        }}
      />
    ),
    size: 250,
  }),
  columnHelper.accessor('orderId', {
    header: () => <span>Order ID (Clickable)</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.orderId}
        onClick={() => {
          console.log('Order ID clicked:', props.row.original.orderId);
        }}
      />
    ),
    size: 150,
  }),
];

export const ClickableText: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Clickable Text with onClick
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell can be made clickable using the <code>onClick</code> prop.
            Clicking the text triggers a custom action. onClick takes precedence
            over href.
          </Text>
          <DataTable
            columns={ClickableColumns}
            data={extendedData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 4: Copyable Text
const CopyableColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('orderId', {
    header: () => <span>Order ID (Copyable)</span>,
    cell: (props) => <TextCell text={props.row.original.orderId} isCopyable />,
    size: 150,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title (Copyable)</span>,
    cell: (props) => <TextCell text={props.row.original.title} isCopyable />,
    size: 250,
  }),
];

export const CopyableText: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Copyable Text
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell can display copyable text using the <code>isCopyable</code>{' '}
            prop. Users can click to copy the text to clipboard.
          </Text>
          <DataTable
            columns={CopyableColumns}
            data={extendedData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 5: Badge Display
const BadgeColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => <TextCell text={props.row.original.title} />,
    size: 200,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status (Badge)</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.status}
        isBadge
        badgeColor={
          props.row.original.status === 'active'
            ? 'green'
            : props.row.original.status === 'inactive'
              ? 'red'
              : 'yellow'
        }
      />
    ),
    size: 150,
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category (Badge)</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.category}
        isBadge
        colorPalette="blue"
      />
    ),
    size: 150,
  }),
];

export const BadgeDisplay: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Badge Display
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell can display text as badges using the <code>isBadge</code>{' '}
            prop with <code>badgeColor</code> or <code>colorPalette</code> for
            styling.
          </Text>
          <DataTable columns={BadgeColumns} data={extendedData} {...datatable}>
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 6: Array of Badges
const ArrayBadgeColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => <TextCell text={props.row.original.title} />,
    size: 200,
  }),
  columnHelper.accessor('tags', {
    header: () => <span>Tags (Array of Badges)</span>,
    cell: (props) => (
      <TextCell text={props.row.original.tags || []} colorPalette="purple" />
    ),
    size: 300,
  }),
];

export const ArrayOfBadges: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Array of Badges
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell can display an array of strings as multiple badges. Pass an
            array to the <code>text</code> prop along with{' '}
            <code>colorPalette</code> or <code>badgeColor</code>.
          </Text>
          <DataTable
            columns={ArrayBadgeColumns}
            data={extendedData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 7: Null/Undefined Handling
const NullHandlingData: ExtendedProduct[] = [
  ...extendedData.slice(0, 3),
  {
    id: 999,
    title: 'Product with Missing Data',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
    tags: undefined,
    website: undefined,
    status: undefined,
    orderId: undefined,
  },
  ...extendedData.slice(3, 6),
];

const NullHandlingColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => <TextCell text={props.row.original.title} />,
    size: 200,
  }),
  columnHelper.accessor('website', {
    header: () => <span>Website</span>,
    cell: (props) => <TextCell text={props.row.original.website} />,
    size: 200,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: (props) => <TextCell text={props.row.original.status} />,
    size: 150,
  }),
  columnHelper.accessor('tags', {
    header: () => <span>Tags</span>,
    cell: (props) => <TextCell text={props.row.original.tags} />,
    size: 200,
  }),
];

export const NullUndefinedHandling: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Null/Undefined Handling
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell automatically displays a dash (-) when the text value is
            null, undefined, or empty. This provides a consistent UI for missing
            data.
          </Text>
          <DataTable
            columns={NullHandlingColumns}
            data={NullHandlingData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 8: All Features Combined
const AllFeaturesColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.title}
        href={props.row.original.website}
      />
    ),
    size: 200,
  }),
  columnHelper.accessor('orderId', {
    header: () => <span>Order ID</span>,
    cell: (props) => <TextCell text={props.row.original.orderId} isCopyable />,
    size: 150,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.status}
        isBadge
        badgeColor={
          props.row.original.status === 'active'
            ? 'green'
            : props.row.original.status === 'inactive'
              ? 'red'
              : 'yellow'
        }
      />
    ),
    size: 120,
  }),
  columnHelper.accessor('tags', {
    header: () => <span>Tags</span>,
    cell: (props) => (
      <TextCell text={props.row.original.tags || []} colorPalette="purple" />
    ),
    size: 250,
  }),
];

export const AllFeaturesCombined: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            All Features Combined
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            A comprehensive example showcasing all TextCell features: basic
            text, links, copyable text, badges, and arrays of badges.
          </Text>
          <DataTable
            columns={AllFeaturesColumns}
            data={extendedData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 9: Color Palette Variations
const ColorPaletteColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => <TextCell text={props.row.original.title} />,
    size: 200,
  }),
  columnHelper.display({
    id: 'colorVariations',
    header: () => <span>Color Palette Variations</span>,
    cell: (props) => {
      const colors: Array<
        | 'gray'
        | 'red'
        | 'orange'
        | 'yellow'
        | 'green'
        | 'teal'
        | 'blue'
        | 'cyan'
        | 'purple'
        | 'pink'
      > = [
        'gray',
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'cyan',
        'purple',
        'pink',
      ];
      const index = props.row.index % colors.length;
      return (
        <TextCell text={colors[index]} isBadge colorPalette={colors[index]} />
      );
    },
    size: 200,
  }),
];

export const ColorPaletteVariations: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Color Palette Variations
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            TextCell supports various color palettes for badges: gray, red,
            orange, yellow, green, teal, blue, cyan, purple, and pink. All
            colors support dark mode.
          </Text>
          <DataTable
            columns={ColorPaletteColumns}
            data={extendedData}
            {...datatable}
          >
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Story 10: Text Highlighting with Global Filter
const HighlightingColumns: ColumnDef<ExtendedProduct>[] = [
  columnHelper.accessor('id', {
    header: () => <span>ID</span>,
    cell: (props) => <TextCell text={props.row.original.id} />,
    size: 80,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title (Plain Text)</span>,
    cell: (props) => <TextCell text={props.row.original.title} />,
    size: 200,
  }),
  columnHelper.accessor('title', {
    id: 'titleLink',
    header: () => <span>Title (Link)</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.title}
        href={props.row.original.website}
      />
    ),
    size: 200,
  }),
  columnHelper.accessor('orderId', {
    header: () => <span>Order ID (Copyable)</span>,
    cell: (props) => <TextCell text={props.row.original.orderId} isCopyable />,
    size: 150,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status (Badge)</span>,
    cell: (props) => (
      <TextCell
        text={props.row.original.status}
        isBadge
        badgeColor={
          props.row.original.status === 'active'
            ? 'green'
            : props.row.original.status === 'inactive'
              ? 'red'
              : 'yellow'
        }
      />
    ),
    size: 120,
  }),
  columnHelper.accessor('tags', {
    header: () => <span>Tags (Array of Badges)</span>,
    cell: (props) => (
      <TextCell text={props.row.original.tags || []} colorPalette="purple" />
    ),
    size: 250,
  }),
];

export const TextHighlightingWithGlobalFilter: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'id', desc: false }],
        pagination: { pageSize: 10, pageIndex: 0 },
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Text Highlighting with Global Filter
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            When you type in the global filter search box, matching text in all
            TextCell components will be automatically highlighted with a yellow
            background. This works across all TextCell variants: plain text,
            links, copyable text, badges, and arrays of badges. Try searching
            for terms like "iPhone", "active", "new", or "ORD" to see the
            highlighting in action.
          </Text>
          <DataTable
            columns={HighlightingColumns}
            data={extendedData}
            {...datatable}
          >
            <Flex mb={4} gap={2} alignItems="center">
              <Text fontSize="sm" fontWeight="medium">
                Search:
              </Text>
              <GlobalFilter />
            </Flex>
            <DefaultTable />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};
