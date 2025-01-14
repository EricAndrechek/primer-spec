import { isTodayInRange, Month } from './utils/is_today_in_range';
import { printEnablingURLToConsole } from './utils/print_enabling_url_to_console';

export function shouldLoadPlugin(pluginId: string): boolean {
  if (window.PrimerSpecConfig.disableJokes) {
    return false;
  }

  const forceEnableOption = pluginForceEnableOption(pluginId);
  if (forceEnableOption !== null) {
    return forceEnableOption;
  }

  switch (pluginId) {
    case 'halloween':
      // Console message if we are *just* past the Halloween-mode end-date.
      // From November 5 until November 15.
      if (
        isTodayInRange(
          { month: Month.NOVEMBER, date: 5 },
          { month: Month.NOVEMBER, date: 16 },
        )
      ) {
        printEnablingURLToConsole(
          pluginId,
          "🤫 Psst... It's well past halloween, but you can re-enable halloween mode by clicking this url:",
        );
      }

      return isTodayInRange(
        { month: Month.OCTOBER, date: 25 },
        { month: Month.NOVEMBER, date: 5 },
      );

    case 'april_fools_languages':
      // Console message if we are *just* past the April Fools end-date.
      // From April 4 until April 13.
      if (
        isTodayInRange(
          { month: Month.APRIL, date: 4 },
          { month: Month.APRIL, date: 13 },
        )
      ) {
        printEnablingURLToConsole(
          pluginId,
          "🤫 Psst... It's well past April Fools, but you can re-enable the April Fools Language prank by clicking this url:",
        );
      }

      return isTodayInRange(
        { month: Month.MARCH, date: 29 },
        { month: Month.APRIL, date: 4 },
      );
  }
  return false;
}

function pluginForceEnableOption(pluginId: string): boolean | null {
  const match = window.location.search.match(
    new RegExp(`enable_${pluginId}=([0|1])`),
  );
  if (match) {
    return match[1] === '1';
  }
  return null;
}
