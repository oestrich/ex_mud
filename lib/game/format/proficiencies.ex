defmodule Game.Format.Proficiencies do
  @moduledoc """
  Formatting for proficiencies
  """

  alias Game.Format.Table

  def proficiencies(proficiencies) do
    rows =
      proficiencies
      |> Enum.map(fn instance ->
        [instance.name, instance.ranks]
      end)

    rows = [["Name", "Ranks"] | rows]

    Table.format("Proficiencies", rows, [20, 5])
  end
end