class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :description
      t.text :body
      t.string :date
      t.belongs_to :blog, foreign_key: true


      t.timestamps
    end
  end
end
