"""empty message

Revision ID: f40832a7832c
Revises: ffdc0a98111c
Create Date: 2021-08-24 13:37:51.325248

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f40832a7832c'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('full_name', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('is_IR', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_CSEL', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_CMEL', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_ATP', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_CFI', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_CFII', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_MEI', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_complex', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('is_performace', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('total_time', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('home_airport', sa.String(length=5), nullable=False))
    op.drop_constraint('users_username_key', 'users', type_='unique')
    op.create_unique_constraint(None, 'users', ['full_name'])
    op.drop_column('users', 'username')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('username', sa.VARCHAR(length=40), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'users', type_='unique')
    op.create_unique_constraint('users_username_key', 'users', ['username'])
    op.drop_column('users', 'home_airport')
    op.drop_column('users', 'total_time')
    op.drop_column('users', 'is_performace')
    op.drop_column('users', 'is_complex')
    op.drop_column('users', 'is_MEI')
    op.drop_column('users', 'is_CFII')
    op.drop_column('users', 'is_CFI')
    op.drop_column('users', 'is_ATP')
    op.drop_column('users', 'is_CMEL')
    op.drop_column('users', 'is_CSEL')
    op.drop_column('users', 'is_IR')
    op.drop_column('users', 'full_name')
    # ### end Alembic commands ###
