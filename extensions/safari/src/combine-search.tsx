import { List, Icon, Color } from "@raycast/api";
import { useThrottle } from "ahooks";
import _ from "lodash";
import { useState } from "react";
import { useDevices, useBookmarks, useHistorySearch } from "./hooks";
import { Tab, GeneralBookmark, HistoryItem } from "./types";
import { search } from "./utils";
import TabListItem from "./components/TabListItem";
import BookmarkListItem from "./components/BookmarkListItem";
import HistoryListItem from "./components/HistoryListItem";

// Combined search result type with priority
type SearchResultType = "tab" | "history" | "bookmark";

interface CombinedSearchResult {
  type: SearchResultType;
  data: Tab | HistoryItem | GeneralBookmark;
  priority: number; // 1=tab, 2=history, 3=bookmark
}

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const throttleSearchText = useThrottle(searchText, { wait: 200 });

  // Get data from all sources
  const { devices, permissionView: tabPermissionView, refreshDevices } = useDevices();
  const { bookmarks, hasPermission: hasBookmarkPermission } = useBookmarks(false);
  const { data: historyData, permissionView: historyPermissionView } = useHistorySearch(throttleSearchText);

  // Show permission view if needed
  if (tabPermissionView.current) {
    return tabPermissionView.current;
  }
  if (historyPermissionView) {
    return historyPermissionView;
  }
  if (!hasBookmarkPermission) {
    return historyPermissionView;
  }

  // Combine and search all tabs
  const allTabs: Tab[] = devices ? _.flatMap(devices, (device) => (device.tabs || []) as Tab[]) : [];
  const filteredTabs = search(
    allTabs,
    [
      { name: "title", weight: 3 },
      { name: "title_formatted", weight: 2 },
      { name: "url", weight: 1 },
    ],
    throttleSearchText,
  ) as Tab[];

  // Search bookmarks
  const filteredBookmarks = search(
    (bookmarks as GeneralBookmark[]) || [],
    [
      { name: "title", weight: 3 },
      { name: "url", weight: 1 },
      { name: "description", weight: 0.5 },
    ],
    throttleSearchText,
  ) as GeneralBookmark[];

  // History is already filtered by the hook
  const filteredHistory = (historyData || []) as HistoryItem[];

  // Combine results with priority
  const combinedResults: CombinedSearchResult[] = [
    ...filteredTabs.map((tab) => ({ type: "tab" as SearchResultType, data: tab, priority: 1 })),
    ...filteredHistory.map((item) => ({ type: "history" as SearchResultType, data: item, priority: 2 })),
    ...filteredBookmarks.map((bookmark) => ({ type: "bookmark" as SearchResultType, data: bookmark, priority: 3 })),
  ];

  // Sort by priority
  const sortedResults = _.sortBy(combinedResults, ["priority"]);

  // Group by type for sections
  const groupedResults = _.groupBy(sortedResults, "type");

  const isLoading = !devices || !bookmarks || !historyData;

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} searchBarPlaceholder="Search tabs, history, and bookmarks...">
      {/* Tabs Section */}
      {groupedResults.tab && groupedResults.tab.length > 0 && (
        <List.Section title="Tabs" subtitle={`${groupedResults.tab.length} results`}>
          {groupedResults.tab.map((result, index) => (
            <TabListItem key={`tab-${(result.data as Tab).uuid}-${index}`} tab={result.data as Tab} refresh={refreshDevices} />
          ))}
        </List.Section>
      )}

      {/* History Section */}
      {groupedResults.history && groupedResults.history.length > 0 && (
        <List.Section title="History" subtitle={`${groupedResults.history.length} results`}>
          {groupedResults.history.map((result, index) => {
            const historyItem = result.data as HistoryItem;
            return <HistoryListItem key={`history-${historyItem.id}-${index}`} entry={historyItem} searchText={searchText} />;
          })}
        </List.Section>
      )}

      {/* Bookmarks Section */}
      {groupedResults.bookmark && groupedResults.bookmark.length > 0 && (
        <List.Section title="Bookmarks" subtitle={`${groupedResults.bookmark.length} results`}>
          {groupedResults.bookmark.map((result, index) => (
            <BookmarkListItem key={`bookmark-${(result.data as GeneralBookmark).uuid}-${index}`} bookmark={result.data as GeneralBookmark} />
          ))}
        </List.Section>
      )}

      {/* Empty state */}
      {!isLoading && sortedResults.length === 0 && searchText && (
        <List.EmptyView
          icon={{ source: Icon.MagnifyingGlass, tintColor: Color.SecondaryText }}
          title="No Results"
          description="Try a different search term"
        />
      )}
    </List>
  );
}
