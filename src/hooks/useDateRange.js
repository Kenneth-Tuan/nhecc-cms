import { computed, reactive } from "vue";
import dayjs from "dayjs";

import { useLandingPageStore } from "@/stores/landingPage";
import { useSearchStore } from "@/stores/search";
import { DateRangeResourceEnum, DateTypeEnum } from "@/enums/LandingPageEnum";

export default function useDateRange(
  type = DateRangeResourceEnum.LANDING_PAGE
) {
  const landingStore = useLandingPageStore();
  const { awbNumberColumns } = landingStore;

  const searchStore = useSearchStore();
  const { searchCriteria } = searchStore;

  const dateTypeOptions = reactive([
    {
      label: "Future 1 Month",
      value: DateTypeEnum.FUTURE_ONE_MONTH,
    },
    {
      label: "Today Only",
      value: DateTypeEnum.TODAY,
    },
    {
      label: "Last 3 Days",
      value: DateTypeEnum.LAST_THREE_DAYS,
    },
    {
      label: "Last 2 Weeks",
      value: DateTypeEnum.LAST_TWO_WEEKS,
    },
    {
      label: "Last 1 Month",
      value: DateTypeEnum.LAST_ONE_MONTH,
    },
    {
      label: "Other",
      value: DateTypeEnum.OTHER,
    },
  ]);

  const dateRangeState = computed(() => {
    const keyNames = ["dateRangeType", "dateRangeFrom", "dateRangeTo"];
    let target = null;

    if (type === DateRangeResourceEnum.LANDING_PAGE) {
      target = awbNumberColumns;
    } else {
      target = searchCriteria;
    }

    return Object.keys(target)
      .filter((key) => keyNames.includes(key))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: target[key] });
      }, {});
  });

  function updateDateRangeType(value) {
    dateRangeState.value.dateRangeType.value = value;
    let startDate = "";
    let endDate = "";
    switch (value) {
      case DateTypeEnum.FUTURE_ONE_MONTH:
        startDate = dayjs();
        endDate = dayjs().add(1, "month");
        break;
      case DateTypeEnum.TODAY:
        startDate = dayjs();
        endDate = dayjs();
        break;
      case DateTypeEnum.LAST_THREE_DAYS:
        startDate = dayjs().subtract(3, "day");
        endDate = dayjs();
        break;
      case DateTypeEnum.LAST_TWO_WEEKS:
        startDate = dayjs().subtract(2, "week");
        endDate = dayjs();
        break;
      case DateTypeEnum.LAST_ONE_MONTH:
        startDate = dayjs().subtract(1, "month");
        endDate = dayjs();
        break;
      case DateTypeEnum.OTHER:
      default:
        break;
    }
    startDate = startDate ? startDate.format("YYYY-MM-DD") : "";
    endDate = endDate ? endDate.format("YYYY-MM-DD") : "";

    dateRangeState.value.dateRangeFrom.value = startDate;
    dateRangeState.value.dateRangeTo.value = endDate;
  }

  function updateDateRange(value, field) {
    dateRangeState.value[field].value = value;
    checkDateRangeType();
  }

  function checkDateRangeType() {
    const startDate = dayjs(
      dateRangeState.value.dateRangeFrom.value,
      "YYYY-MM-DD"
    );
    const endDate = dayjs(dateRangeState.value.dateRangeTo.value, "YYYY-MM-DD");
    const isEndDateEqualsToday = endDate.isSame(dayjs(), "day");
    const isStartDateEqualsToday = startDate.isSame(dayjs(), "day");
    if (isStartDateEqualsToday && isEndDateEqualsToday) {
      dateRangeState.value.dateRangeType.value = DateTypeEnum.TODAY;
    } else if (isEndDateEqualsToday) {
      if (startDate.add(3, "day").isSame(endDate, "day")) {
        dateRangeState.value.dateRangeType.value = DateTypeEnum.LAST_THREE_DAYS;
      } else if (startDate.add(14, "day").isSame(endDate, "day")) {
        dateRangeState.value.dateRangeType.value = DateTypeEnum.LAST_TWO_WEEKS;
      } else if (startDate.add(1, "month").isSame(endDate, "day")) {
        dateRangeState.value.dateRangeType.value = DateTypeEnum.LAST_ONE_MONTH;
      } else {
        dateRangeState.value.dateRangeType.value = DateTypeEnum.OTHER;
      }
    } else if (isStartDateEqualsToday) {
      if (startDate.add(1, "month").isSame(endDate, "day")) {
        dateRangeState.value.dateRangeType.value =
          DateTypeEnum.FUTURE_ONE_MONTH;
      } else {
        dateRangeState.value.dateRangeType.value = DateTypeEnum.OTHER;
      }
    } else {
      dateRangeState.value.dateRangeType.value = DateTypeEnum.OTHER;
    }
  }

  function initDateRange() {
    updateDateRangeType(DateTypeEnum.FUTURE_ONE_MONTH);
  }

  return {
    dateRangeState,
    dateTypeOptions,
    updateDateRangeType,
    updateDateRange,
    initDateRange,
  };
}
